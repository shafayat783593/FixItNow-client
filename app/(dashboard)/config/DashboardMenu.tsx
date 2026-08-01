import { ISidebarItem } from "@/lib/type";
import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  Clock3,
  UserCog,
  Wrench,
  Users,
  FolderTree,
  Home,
} from "lucide-react";

const CUSTOMER_SIDEBAR_ITEM: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard/customer",
    icon: LayoutDashboard,
  },
  {
    label: "My Booking",
    href: "/dashboard/customer/my-bookings",
    icon: CalendarCheck,
  },  {
    label: "Home",
    href: "/",
    icon:Home,
  },
];

const TECHNICIAN_SIDEBAR_ITEM: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard/technician",
    icon: LayoutDashboard,
  },
  {
    label: "Booking Management",
    href: "/dashboard/technician/bookings",
    icon: ClipboardList,
  },
  {
    label: "Availability",
    href: "/dashboard/technician/availability",
    icon: Clock3,
  },
  {
    label: "Profile",
    href: "/dashboard/technician/profile",
    icon: UserCog,
  },
  {
    label: "Service Management",
    href: "/dashboard/technician/services",
    icon: Wrench,
  },  {
    label: "Home",
    href: "/",
    icon: Home,
  },
];

const ADMIN_SIDEBAR_ITEM: ISidebarItem[] = [
  {
    label: "Admin Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Manage Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    label: "Manage Bookings",
    href: "/dashboard/admin/bookings",
    icon: ClipboardList,
  },
  {
    label: "Manage Categories",
    href: "/dashboard/admin/categories",
    icon: FolderTree,
  },
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
];

export const sideBarMenuItems = {
  CUSTOMER: CUSTOMER_SIDEBAR_ITEM,
  TECHNICIAN: TECHNICIAN_SIDEBAR_ITEM,
  ADMIN: ADMIN_SIDEBAR_ITEM,
};