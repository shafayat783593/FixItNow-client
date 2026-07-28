
import { ISidebarItem } from "@/lib/type"
import { FileText, LayoutDashboard,  } from "lucide-react"


 




const USER_SIDEBAR_ITEM:ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        label: "My Posts",
        href: "/dashboard/my-posts",
        icon: FileText
    },
]
const AUTHOR_SIDEBAR_ITEM:ISidebarItem[] = [
    {
        label: "Author-Dashboard",
        href: "/author-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "My Posts",
        href: "/author-dashboard/my-posts",
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
    USER: USER_SIDEBAR_ITEM,
    AUTHOR: AUTHOR_SIDEBAR_ITEM,
    ADMIN: ADMIN_SIDEBAR_ITEM
}