sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'LCAPCustLoyalty/Purchases/test/integration/FirstJourney',
		'LCAPCustLoyalty/Purchases/test/integration/pages/PurchaseList',
		'LCAPCustLoyalty/Purchases/test/integration/pages/PurchaseObjectPage'
    ],
    function(JourneyRunner, opaJourney, PurchaseList, PurchaseObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('LCAPCustLoyalty/Purchases') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePurchaseList: PurchaseList,
					onThePurchaseObjectPage: PurchaseObjectPage
                }
            },
            opaJourney.run
        );
    }
);