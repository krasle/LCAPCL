/**
 * Code is auto-generated by Application Logic, DO NOT EDIT.
 * @version(2.0)
 */
const LCAPApplicationService = require('@sap/low-code-event-handler');
const purchase_Logic = require('./code/purchase-logic');

class loyaltySrv extends LCAPApplicationService {
    async init() {

        this.on('CREATE', 'Purchase', async (request, next) => {
            await purchase_Logic(request);
            return next();
        });

        return super.init();
    }
}


module.exports = {
    loyaltySrv
};