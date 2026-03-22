export interface ProviderItem {
  _id: string;
  name: string;
  address: string;
  tel: string;
  id?: string;
}

export interface BookingItem {
  _id: string;
  bookingDate?: string;
  date?: string;
  createdAt?: string;
  user: string;
  provider: ProviderItem;
}