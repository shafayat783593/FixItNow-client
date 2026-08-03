export type BookingStatus = "REQUESTED"| "ACCEPTED"| "DECLINED"| "PAID"| "IN_PROGRESS"| "COMPLETED"| "CANCELLED";

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  avatar?: string | null;
}

export interface IBooking {
  id: string;
  scheduledAt: string;
  address: string;
  notes?: string | null;
  status: BookingStatus;
  createdAt: string;
  customer?: ICustomer | null;

  service: {
    id: string;
    title: string;
    price: number;
    duration?: number | null;
    category?: {
      id: string;
      name: string;
    } | null;
  };
  technician: {
    id: string;
    user?: {
      name: string;
      avatar?: string | null;
    } | null;
  };
  payment?: {
    id: string;
    amount: number;
    status: string;
    transactionId?: string | null;
  } | null;
}

