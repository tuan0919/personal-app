export interface Customer {
  customerId: number;
  customerName: string;
  address: string;
  phoneNumber: string;
  price1: number;
  price2: number;
}

export interface FilterValues {
  priceRange?: {
    min: number;
    max: number;
  };
}
