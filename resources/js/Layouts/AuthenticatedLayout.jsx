// resources/js/Layouts/AppLayout.jsx
import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
  Menu,
  ChevronLeft,
  LayoutDashboard,
  Briefcase,
  Users,
  Upload,
  FileText,
  LogOut,
  Bell,
  Settings,
} from "lucide-react";

export default function AppLayout({ children }) {
  const { auth } = usePage().props;
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { href: "/Dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/JobPosting", icon: Briefcase, label: "Job Posting" },
    { href: "/Candidate", icon: Users, label: "Candidates" },
    { href: "/ExternalDataUpload", icon: Upload, label: "Data Upload" },
    { href: "/Reports", icon: FileText, label: "Reports" },
    { href: "/Employees", icon: Users, label: "Employees" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar with Background Image */}
      <aside
        className={`relative overflow-hidden border-r shadow-lg transition-all duration-300 flex flex-col ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        {/* Background Image */}
        
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />


        {/* Dark overlay — makes text readable */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />

        {/* Content on top */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo + Toggle */}
          <div className="flex items-center justify-between p-4 border-b border-white border-opacity-20">

            {!collapsed && (
              <>
                <img src="/android-chrome-512x512.png" width="50" />
                <h1 className="text-xl font-bold text-white tracking-wider">VASP HRMS</h1>
              </>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 text-white transition"
            >
              {collapsed ? <Menu size={22} /> : <ChevronLeft size={22} />}
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:bg-white hover:bg-opacity-25 transition-all duration-200 font-medium"
              >
                <item.icon size={21} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-white border-opacity-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                {auth?.user?.name?.charAt(0) ?? "U"}
              </div>
              {!collapsed && (
                <div>
                  <p className="text-white font-semibold">{auth?.user?.name}</p>
                  <p className="text-gray-200 text-xs">Administrator</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b shadow-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome back, {auth?.user?.name?.split(" ")[0] || "Admin"}!
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Settings size={20} />
              </button>
              <Link
                href="/logout"
                method="post"
                as="button"
                className="flex items-center gap-2 px-4 py-2 text-black rounded-lg hover:bg-red-700 transition"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}