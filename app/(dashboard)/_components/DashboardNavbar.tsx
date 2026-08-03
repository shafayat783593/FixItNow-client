'use client';

import { useState, useEffect } from 'react';
import { Menu, Search, Bell, User, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { logout } from '@/hooks/logout';
import { DashboardNavbarProps } from '@/lib/type';
import Image from 'next/image';

export default function DashboardHeader({ user, isSidebarOpen, setIsSidebarOpen }: DashboardNavbarProps) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (!e.target.closest('.user-menu')) setIsUserMenuOpen(false);
            if (!e.target.closest('.notification-menu')) setIsNotificationsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        setIsUserMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 lg:px-8 transition-colors duration-500">
            <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-xl text-foreground hover:bg-primary/10 transition-colors lg:hidden cursor-pointer"
                    >
                        <Menu size={22} />
                    </button>
                    {/* <div className="relative flex-1 max-w-md hidden md:block">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search anything..."
                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground transition-all"
                        />
                    </div> */}
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <div className="relative notification-menu">
                        <button
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className="relative p-2.5 rounded-xl text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
                        >
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card"></span>
                        </button>
                        {isNotificationsOpen && (
                            <div className="absolute right-0 mt-3 w-72 bg-card rounded-2xl shadow-2xl border border-border z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                                <div className="p-4 border-b border-border bg-primary/5">
                                    <h3 className="font-bold text-foreground text-sm">Recent Alerts</h3>
                                </div>
                                <div className="p-4 text-center text-xs text-muted-foreground italic">No new notifications</div>
                            </div>
                        )}
                    </div>

                    <div className="relative user-menu ml-2">


                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="flex items-center gap-3 p-1 rounded-full hover:bg-primary/5 transition-all cursor-pointer"
                        >
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary to-primary/70 shadow-lg border-2 border-card flex items-center justify-center">
                                {user?.avatar ? (
                                    <Image
                                        src={user?.avatar.replace("i.ibb.co.com", "i.ibb.co")}
                                        alt={user?.name || "User"}
                                        fill
                                        sizes="40px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="text-primary-foreground font-bold text-sm uppercase">
                                        {user?.name?.[0] || "U"}
                                    </span>
                                )}
                            </div>

                            <div className="hidden lg:block text-left">
                                <p className="text-sm font-black text-foreground leading-none">
                                    {user?.name || "User"}
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-tighter">
                                    {user?.role || "Member"}
                                </p>
                            </div>
                        </button>


                        {isUserMenuOpen && (
                            <div className="absolute right-0 mt-3 w-60 bg-card border border-border rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                                {/* User Info */}
                                <div className="flex items-center gap-3 px-4 py-3 border-b border-border mb-2">
                                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                                        {user?.avatar ? (
                                            <Image
                                                src={user?.avatar.replace("i.ibb.co.com", "i.ibb.co")}
                                                alt={user?.name || "User"}
                                                fill
                                                sizes="48px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span className="text-lg font-bold text-primary uppercase">
                                                {user?.name?.[0] || "?"}
                                            </span>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="text-sm font-bold truncate">{user?.name}</h3>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                <Link
                                                 href="/profile"

                                    onClick={() => setIsUserMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-foreground hover:bg-primary/10 rounded-xl transition-all"
                                >
                                    <Settings size={18} className="text-muted-foreground" />
                                    Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 mt-2 text-sm font-black text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                                >
                                    <LogOut size={18} />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}