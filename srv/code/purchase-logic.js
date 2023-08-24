/**
 * With each purchase, the value of the purchase should be added to the customer's total purchase points, getting one point per 10 dollars.
 * If the customer's total purchase points is at least 100 more than the customer's redeemed purchase points, calculate the reward as the difference round by 100. then add the reward to the redeemed points and show a message "customer (email) gets a coupon for 100 points!", replacing the word customer with the real customer name and 100 by the reward and email by the real customer email.
 * @On(event = { "CREATE" }, entity = "loyaltySrv.Purchase")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(request) {
    const { data } = request;
    const tx = cds.transaction(request);
    const customer = await tx.run(SELECT.one.from('loyaltySrv.Customer').where({ ID: data.customer_ID }));

    if (!customer) {
        return `Customer with ID ${data.customer_ID} not found.`;
    }

    const purchasePoints = Math.floor(data.purchaseValue / 10);
    customer.totalPoints += purchasePoints;
    customer.totalPurchaseValue += data.purchaseValue;
    customer.numberOfPurchases += 1;

    const reward = Math.floor((customer.totalPoints - customer.redeemedPoints) / 100);
    if (reward > 0) {
        customer.redeemedPoints += reward * 100;
        console.log(`Customer ${customer.firstName} ${customer.lastName} (${customer.email}) gets a coupon for ${reward * 100} points!`);
    }

    await tx.run(UPDATE('loyaltySrv.Customer').set(customer).where({ ID: data.customer_ID }));
};