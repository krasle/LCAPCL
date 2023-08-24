using { loyalty } from '../db/schema.cds';

@path : '/service/loyalty'
service loyaltySrv
{
    @odata.draft.enabled
    entity Customer as
        projection on loyalty.Customer;

    @odata.draft.enabled
    entity Purchase as
        projection on loyalty.Purchase;
}
