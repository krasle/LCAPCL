using { loyaltySrv } from '../srv/service.cds';

annotate loyaltySrv.Customer with @odata.draft.enabled;
annotate loyaltySrv.Purchase with @odata.draft.enabled;
annotate loyaltySrv.Purchase with @cds.odata.valuelist;
annotate loyaltySrv.Customer with @cds.odata.valuelist;
annotate loyaltySrv.Customer with @UI.HeaderInfo: { TypeName: 'Customer', TypeNamePlural: 'Customers', Title: { Value: email } };
annotate loyaltySrv.Customer with {
  ID @Common.Text: { $value: email, ![@UI.TextArrangement]: #TextOnly }
};
annotate loyaltySrv.Customer with @UI.Identification: [{ Value: email }];
annotate loyaltySrv.Customer with {
  firstName @title: 'First Name';
  lastName @title: 'Last Name';
  email @title: 'Email';
  totalPoints @title: 'Total Points';
  totalPurchaseValue @title: 'Total Purchase Value';
  numberOfPurchases @title: 'Number of Purchases';
  redeemedPoints @title: 'Redeemed Points'
};

annotate loyaltySrv.Customer with @UI.LineItem: [
    { $Type: 'UI.DataField', Value: firstName },
    { $Type: 'UI.DataField', Value: lastName },
    { $Type: 'UI.DataField', Value: email },
    { $Type: 'UI.DataField', Value: totalPoints },
    { $Type: 'UI.DataField', Value: totalPurchaseValue },
    { $Type: 'UI.DataField', Value: numberOfPurchases },
    { $Type: 'UI.DataField', Value: redeemedPoints }
];

annotate loyaltySrv.Customer with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
    { $Type: 'UI.DataField', Value: firstName },
    { $Type: 'UI.DataField', Value: lastName },
    { $Type: 'UI.DataField', Value: email },
    { $Type: 'UI.DataField', Value: totalPoints },
    { $Type: 'UI.DataField', Value: totalPurchaseValue },
    { $Type: 'UI.DataField', Value: numberOfPurchases },
    { $Type: 'UI.DataField', Value: redeemedPoints }
  ]
};

annotate loyaltySrv.Customer with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

annotate loyaltySrv.Purchase with @UI.HeaderInfo: { TypeName: 'Purchase', TypeNamePlural: 'Purchases', Title: { Value: purchaseValue } };
annotate loyaltySrv.Purchase with {
  ID @Common.Text: { $value: purchaseValue, ![@UI.TextArrangement]: #TextOnly }
};
annotate loyaltySrv.Purchase with @UI.Identification: [{ Value: purchaseValue }];
annotate loyaltySrv.Purchase with {
  purchaseValue @title: 'Purchase Value';
  purchasePoints @title: 'Purchase Points'
};

annotate loyaltySrv.Purchase with @UI.LineItem: [
    { $Type: 'UI.DataField', Value: purchaseValue },
    { $Type: 'UI.DataField', Value: purchasePoints },
    { $Type: 'UI.DataField', Label: 'Customer', Value: customer_ID }
];

annotate loyaltySrv.Purchase with @UI.FieldGroup #Main: {
  $Type: 'UI.FieldGroupType', Data: [
    { $Type: 'UI.DataField', Value: purchaseValue },
    { $Type: 'UI.DataField', Value: purchasePoints },
    { $Type: 'UI.DataField', Label: 'Customer', Value: customer_ID }
  ]
};

annotate loyaltySrv.Purchase with {
  customer @Common.Text: { $value: customer.email, ![@UI.TextArrangement]: #TextOnly }
};

annotate loyaltySrv.Purchase with @UI.Facets: [
  { $Type: 'UI.ReferenceFacet', ID: 'Main', Label: 'General Information', Target: '@UI.FieldGroup#Main' }
];

