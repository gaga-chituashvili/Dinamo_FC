"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AdminGuard } from "@/src/features/admin/components/AdminGuard";
import { AdminSidebar } from "@/src/features/admin/components/AdminSidebar";
import { AuthProvider } from "@/src/features/admin/lib/auth.context";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <AdminGuard>
        <div className="flex h-screen bg-gray-50">
          {/* Mobile burger */}
          <button
            className="fixed left-4 top-4 z-60 flex h-8 w-8 items-center justify-center rounded-md bg-white shadow md:hidden"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

          {/* Backdrop */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`fixed left-0 top-0 z-50 h-full transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <AdminSidebar />
          </div>

          <main className="flex-1 overflow-auto pt-14 md:pt-0">{children}</main>
        </div>
      </AdminGuard>
    </AuthProvider>
  );
}
