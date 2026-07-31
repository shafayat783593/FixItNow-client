
import { ISidebarItem } from "@/lib/type"
import { FileText, LayoutDashboard,  } from "lucide-react"


 




const CUSTOMER_SIDEBAR_ITEM:ISidebarItem[] = [
    {
        label: "Home",
        href: "/",
        icon: LayoutDashboard
    },
    {
        label: "My Booking",
        href: "/dashboard/customer/my-bookings",
        icon: FileText
    },
]
const TECHNICIAN_SIDEBAR_ITEM:ISidebarItem[] = [
    {
        label: "Home",
        href: "/",
        icon: LayoutDashboard
    },
    {
        label: "Booking Management",
        href: "/dashboard/technician/bookings",
        icon: FileText
    },
    {
        label: "Availability",
        href: "/dashboard/technician/availability",
        icon: FileText
    },
]
const ADMIN_SIDEBAR_ITEM:ISidebarItem[] = [
    {
        label: "Admin-Dashboard",
        href: "/admin-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "Manage users ",
        href: "/dashboard/manage-users",
        icon: FileText
    },
]



export const sideBarMenuItems = {
    CUSTOMER: CUSTOMER_SIDEBAR_ITEM,
    TECHNICIAN: TECHNICIAN_SIDEBAR_ITEM,
    ADMIN: ADMIN_SIDEBAR_ITEM
}