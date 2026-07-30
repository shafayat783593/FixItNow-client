export type BookingStatus = "REQUESTED"| "ACCEPTED"| "DECLINED"| "PAID"| "IN_PROGRESS"| "COMPLETED"| "CANCELLED";

export interface IBooking {
  id: string;
  scheduledAt: string;
  address: string;
  notes?: string;
  status: BookingStatus;
  createdAt: string;
  service: {
    id: string;
    title: string;
    price: number;
    category?: { name: string };
  };
  technician: {
    id: string;
    user?: {
      name: string;
      avatar?: string;
    };
  };
  payment?: {
    id: string;
    amount: number;
    status: string;
  } | null;
}