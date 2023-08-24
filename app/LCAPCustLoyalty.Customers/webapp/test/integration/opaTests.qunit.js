sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'LCAPCustLoyalty/Customers/test/integration/FirstJourney',
		'LCAPCustLoyalty/Customers/test/integration/pages/CustomerList',
		'LCAPCustLoyalty/Customers/test/integration/pages/CustomerObjectPage'
    ],
    function(JourneyRunner, opaJourney, CustomerList, CustomerObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('LCAPCustLoyalty/Customers') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCustomerList: CustomerList,
					onTheCustomerObjectPage: CustomerObjectPage
                }
            },
            opaJourney.run
        );
    }
);