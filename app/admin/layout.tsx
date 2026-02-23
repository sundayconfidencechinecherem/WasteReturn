// app/admin/layout.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import {
  LayoutDashboardIcon,
  UsersIcon,
  TruckIcon,
  RecycleIcon,
  CreditCardIcon,
  BarChart3Icon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  BellIcon,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboardIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
  { name: 'Drivers', href: '/admin/drivers', icon: TruckIcon },
  { name: 'Waste Categories', href: '/admin/waste-categories', icon: RecycleIcon },
  { name: 'Transactions', href: '/admin/transactions', icon: CreditCardIcon },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3Icon },
  { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-[#1976D2]">WasteReturn</h2>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#1976D2] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 bg-white border-r border-gray-200">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-[#1976D2]">WasteReturn</h2>
            <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#1976D2] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 bg-[#1976D2] rounded-full flex items-center justify-center text-white">
                A
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@wastereturn.com</p>
              </div>
              <Button variant="ghost" size="sm">
                <LogOutIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon className="w-5 h-5" />
            </Button>
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <BellIcon className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <div className="w-8 h-8 bg-[#1976D2] rounded-full flex items-center justify-center text-white lg:hidden">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}