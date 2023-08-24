namespace loyalty;

entity Customer {
  key ID: UUID;
  firstName: String(100);
  lastName: String(100);
  email: String(200);
  totalPoints: Integer;
  totalPurchaseValue: Decimal(10,2);
  numberOfPurchases: Integer;
  redeemedPoints: Integer;
  purchases: Association to many Purchase on purchases.customer = $self;
}

entity Purchase {
  key ID: UUID;
  purchaseValue: Decimal(10,2);
  purchasePoints: Integer;
  customer: Association to Customer;
}

