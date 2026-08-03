

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import Image from 'next/image';

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}

interface ProfileDropdownProps {
  user: UserProfile;
  onLogout: () => void;
}

export default function ProfileDropdown({ user, onLogout }: ProfileDropdownProps) {
  console.log("user profil dropdown ",user)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
  <button
  onClick={() => setIsOpen(!isOpen)}
  className="flex items-center gap-3 p-1 rounded-xl  transition-colors"
>
  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-indigo-100 border border-indigo-200">
    {user.avatar ? (
      <Image
        src={user.avatar}
        alt={user.name}
        fill
        sizes="40px"
        className="object-cover"
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-indigo-500 font-bold">
        {user.name?.charAt(0).toUpperCase() || "U"}
      </div>
    )}
  </div>

  <ChevronDown
    className={`w-4 h-4 transition-transform  cursor-pointer${
      isOpen ? "rotate-180" : ""
    }`}
  />
</button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-900/10 py-2 z-50">
          <div className="px-4 py-2.5 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:text-coral-600 hover:bg-coral-500/5 transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Profile</span>
            </Link>
            {/* <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:text-coral-600 hover:bg-coral-500/5 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </Link> */}
          </div>

          <div className="pt-1 border-t border-slate-100">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}