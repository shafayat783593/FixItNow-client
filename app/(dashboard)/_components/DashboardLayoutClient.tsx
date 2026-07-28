// _components/DashboardLayoutClient.tsx — 'use client', sync, no await
'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "./DashboardSidebar";
import { IUser } from "@/lib/type";
import DashboardHeader from "./DashboardNavbar";

interface DashboardLayoutClientProps {
    user: IUser;
    children: React.ReactNode;
}

export default function DashboardLayoutClient({ user, children }: DashboardLayoutClientProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);
    const pathname = usePathname();

    return (
        <div key={pathname} className="flex w-full min-h-screen bg-bg">
            <DashboardSidebar
                user={user}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
            />
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader
                    isSidebarOpen={isSidebarOpen}
                     user={user}
                    setIsSidebarOpen={setIsSidebarOpen} />
                <main className="flex-1 p-4 md:p-8">{children}</main>
            </div>
        </div>
    );
}