'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';
import { getMe } from '@/hooks/getMe';
import ProfileDropdown from './ProfileDropdownProps';
import { logout } from '@/hooks/logout';

interface NavLink {
    label: string;
    href: string;
}

interface UserProfile {
    name: string;
    email: string;
    avatarUrl?: string;
}

const navLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const pathname = usePathname();
    const router = useRouter();

    // getMe API call
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getMe()
                if (res) {

                    setUser(res.data.profile || res.data);
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

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:scale-105 transition-transform">
                            <Shield className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold text-white tracking-tight">
                            DevApp<span className="text-indigo-500">.</span>
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                        ? 'text-white bg-slate-800/60'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Profile / Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {loading ? (
                            <div className="w-9 h-9 rounded-full bg-slate-800 animate-pulse" />
                        ) : user ? (
                            <ProfileDropdown user={user} onLogout={handleLogout} />
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02]"
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
                        className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-800/80 bg-slate-950 px-4 pt-3 pb-6 space-y-3">
                    <div className="space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-400 hover:text-white hover:bg-slate-900"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-slate-800">
                        {user ? (
                            <div className="space-y-2">
                                <div className="px-3 py-2 bg-slate-900 rounded-xl border border-slate-800">
                                    <p className="text-sm font-medium text-white">{user.name}</p>
                                    <p className="text-xs text-slate-400">{user.email}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-center px-4 py-2.5 text-sm font-medium text-red-400 bg-red-500/10 rounded-xl border border-red-500/20"
                                >
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Link
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block w-full text-center px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-900 rounded-xl border border-slate-800"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-xl"
                                >
                                    <span>Get Started</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}