'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    Wrench,
    ArrowRight,
    LayoutDashboard,
    Home,
    Sparkles,
    Users,
    HelpCircle,
    User as UserIcon,
} from 'lucide-react';
import { getMe } from '@/hooks/getMe';
import { logout } from '@/hooks/logout';
import ProfileDropdown from './ProfileDropdownProps';

interface NavLink {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}

type Role = 'CUSTOMER' | 'TECHNICIAN' | 'ADMIN';

interface UserProfile {
    name: string;
    email: string;
    role: Role;
    avatar?: string;
    avatarUrl?: string;
}

const navLinks: NavLink[] = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Services', href: '/services', icon: Sparkles },
    { label: 'Technicians', href: '/technicians', icon: Users },
    { label: 'How it works', href: '#how-it-works', icon: HelpCircle },
];

const dashboardPathByRole: Record<Role, string> = {
    CUSTOMER: '/dashboard/customer',
    TECHNICIAN: '/dashboard/technician',
    ADMIN: '/dashboard/admin',
};

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeLink, setActiveLink] = useState<string | null>(null);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getMe();

                if (res) {
                    setUser(res.data.profile || res.data || res);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
            router.push('/login');
            router.refresh();
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const isActive = (href: string) => activeLink === href;

    const dashboardHref = user ? dashboardPathByRole[user.role] : '/login';

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/25 group-hover:scale-105 transition-transform">
                            <Wrench className="w-5 h-5 text-primary-foreground" strokeWidth={2.25} />
                        </div>
                        <span className="text-lg font-bold text-foreground tracking-tight">
                            FixItNow<span className="text-accent">.</span>
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <nav
                        className="hidden md:flex items-center gap-1 relative"
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setActiveLink(link.href)}
                                    onMouseEnter={() => setHoveredLink(link.href)}
                                    className="relative px-4 py-2 rounded-lg text-sm font-medium"
                                >
                                    {(hoveredLink === link.href || (active && hoveredLink === null)) && (
                                        <motion.span
                                            layoutId="nav-highlight"
                                            className="absolute inset-0 rounded-lg bg-accent/10"
                                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                        />
                                    )}
                                    <span
                                        className={`relative z-10 inline-flex items-center gap-1.5 transition-colors ${
                                            active ? 'text-accent-foreground' : 'text-muted-foreground hover:text-accent-foreground'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {link.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Profile / Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {loading ? (
                            <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
                        ) : user ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={dashboardHref}
                                    onClick={() => setActiveLink(dashboardHref)}
                                    className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        isActive(dashboardHref)
                                            ? 'text-accent-foreground bg-accent/10'
                                            : 'text-muted-foreground hover:text-accent-foreground hover:bg-accent/5'
                                    }`}
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Dashboard
                                </Link>
                                <ProfileDropdown user={user} onLogout={handleLogout} />
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setActiveLink('/login')}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        isActive('/login')
                                            ? 'text-accent-foreground bg-accent/10'
                                            : 'text-muted-foreground hover:text-accent-foreground'
                                    }`}
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-primary-foreground bg-primary rounded-xl shadow-lg shadow-primary/25 transition-all hover:bg-accent hover:text-accent-foreground hover:scale-[1.02]"
                                >
                                    <span>Get Started</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-accent-foreground hover:bg-accent/5 transition-colors"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur-md"
                    >
                        <div className="px-4 pt-3 pb-6 space-y-3">
                            <div className="space-y-1">
                                {navLinks.map((link) => {
                                    const Icon = link.icon;
                                    const active = isActive(link.href);
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => {
                                                setActiveLink(link.href);
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                                                active
                                                    ? 'text-accent-foreground bg-accent/10'
                                                    : 'text-muted-foreground hover:text-accent-foreground hover:bg-accent/5'
                                            }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {link.label}
                                        </Link>
                                    );
                                })}
                                {user && (
                                    <Link
                                        href={dashboardHref}
                                        onClick={() => {
                                            setActiveLink(dashboardHref);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                                            isActive(dashboardHref)
                                                ? 'text-accent-foreground bg-accent/10'
                                                : 'text-muted-foreground hover:text-accent-foreground hover:bg-accent/5'
                                        }`}
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Dashboard
                                    </Link>
                                )}
                            </div>

                            <div className="pt-4 border-t border-border/70">
                                {user ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 px-3 py-2 bg-card rounded-xl border border-border">
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0">
                                                {user?.avatar ? (
                                                    <Image
                                                        src={user?.avatar ??""}
                                                        alt={user?.name || 'User avatar'}
                                                        fill
                                                        className="object-cover"
                                                        sizes="40px"
                                                    />
                                                ) : (
                                                    <UserIcon className="w-5 h-5 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-center px-4 py-2.5 text-sm font-medium text-destructive bg-destructive/10 rounded-xl border border-destructive/20"
                                        >
                                            Log out
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Link
                                            href="/login"
                                            onClick={() => {
                                                setActiveLink('/login');
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`block w-full text-center px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors ${
                                                isActive('/login')
                                                    ? 'text-accent-foreground bg-accent/10 border-accent/30'
                                                    : 'text-foreground bg-card border-border'
                                            }`}
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center justify-center gap-2 w-full text-center px-4 py-2.5 text-sm font-bold text-primary-foreground bg-primary rounded-xl"
                                        >
                                            <span>Get Started</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}