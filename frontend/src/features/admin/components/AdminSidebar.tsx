"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, FileText, ShieldCheck, LogOut } from "lucide-react";
import { useAuth } from "@/src/features/admin/lib/auth.context";

const NAV_ITEMS = [
  { href: "/admin/statistics", label: "Statistics", icon: BarChart2 },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
];

export function AdminSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-5 pt-14 md:pt-5">
        <span className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
          <ShieldCheck size={12} /> Admin
        </span>
        <p className="text-sm font-semibold text-gray-800">
          dash<span className="font-normal text-gray-400">board</span>
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 p-2">
        <p className="mb-1 px-2 text-[10px] font-medium uppercase tracking-widest text-gray-400">
          Admin only
        </p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-gray-100 font-medium text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <Icon size={17} strokeWidth={1.6} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-2">
        <div className="flex items-center gap-2.5 rounded-md px-2.5 py-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
            {user?.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-gray-800">
              {user?.name}
            </p>
            <p className="text-[10px] text-gray-400">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            aria-label="Logout"
            className="text-gray-400 hover:text-gray-600"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
