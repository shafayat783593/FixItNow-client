'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface ProfileDropdownProps {
  user: UserProfile;
  onLogout: () => void;
}

export default function ProfileDropdown({ user, onLogout }: ProfileDropdownProps) {
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
        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800/80 transition-colors focus:outline-none"
      >
        <div className="w-9 h-9 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-sm overflow-hidden">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            user.name ? user.name.charAt(0).toUpperCase() : 'U'
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-md">
          <div className="px-4 py-2.5 border-b border-slate-800">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Profile</span>
            </Link>
            <Link
              href="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </Link>
          </div>

          <div className="pt-1 border-t border-slate-800">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
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