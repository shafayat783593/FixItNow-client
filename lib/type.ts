import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"



export type ISidebarItem = {
  label: string,
  href: string,
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>

}


export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string; // ⚠️ should not be present in this response — see note above
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string; // ISO date string, not Date — JSON has no Date type
  updatedAt: string;
  bookingsAsCustomer: IBooking[];
  reviews: IReview[];
}

export interface DashboardNavbarProps {
  user: IUser;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DashboardSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser;
}



export type UserRole = "ADMIN" | "AUTHOR" | "USER";

export type UserStatus = "ACTIVE" | "INACTIVE" | "BANNED"; // adjust to your actual enum values

export interface IBooking {
  // fill in once you know the shape — currently unverifiable from an empty array
  id: string;
}

export interface IReview {
  id: string;
}



// export interface IGetMeSuccess {
//     success: true;
//     message: string;
//     statusCode: number;
//     data: IUserProfile;
// }

// export interface IGetMeFailure {
//     success: false;
//     message: string;
//     statusCode?: number;
// }

// export type IGetMeResponse = IGetMeSuccess | IGetMeFailure;