/**
 * Increase the customer's total purchase points by one point for each 10 dollars of the purchase value.
 * Calculate the reward as the difference between customer's total purchase points and the customer's redeemed purchase points, round by 100.
 * If the reward is more than 0 then add the reward to the redeemed points and show an info message "customer (email) gets a coupon for 100 points!", replacing the word customer with the real customer name and 100 by the reward and email by the real customer email. Regardless of the value of the reward, update the new total purchase value. Update the Purchase's purchase points with the value of the reward.
 * @On(event = { "CREATE" }, entity = "loyaltySrv.Purchase")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
    const { data } = request;
    const tx = cds.transaction(request);
    const customer = await tx.run(SELECT.one.from('loyaltySrv.Customer').where({ ID: data.customer_ID }));

    if (!customer) {
        request.error(400, 'Customer not found');
        return;
    }

    const purchasePoints = Math.floor(data.purchaseValue / 10);
    const totalPoints = customer.totalPoints + purchasePoints;
    const reward = Math.floor((totalPoints - customer.redeemedPoints) / 100) * 100;

    if (reward > 0) {
        customer.redeemedPoints += reward;
        request.info(`Customer ${customer.firstName} ${customer.lastName} (${customer.email}) gets a coupon for ${reward} points!`);
    }

    customer.totalPoints = totalPoints;
    customer.totalPurchaseValue += data.purchaseValue;
    customer.numberOfPurchases += 1;

    await tx.run(UPDATE('loyaltySrv.Customer').set(customer).where({ ID: data.customer_ID }));
    data.purchasePoints = reward;
};