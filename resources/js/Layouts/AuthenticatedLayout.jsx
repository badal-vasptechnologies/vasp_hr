import { useState, useRef, useEffect } from "react";
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
  PanelRightOpen,
  PanelRightClose,
  Lock,
  UserPen,
} from "lucide-react";

export default function AppLayout({ children }) {
  const dropdownRef = useRef(null);
  const { user } = usePage().props;
  const [collapsed, setCollapsed] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const { url } = usePage();

  const allMenuItems = [
    { href: "/Dashboard", icon: LayoutDashboard, label: "Dashboard", roles: ["admin", "hr"] },
    { href: "/Candidate", icon: Users, label: "Candidates", roles: ["admin", "hr"] },
    { href: "/JobPosting", icon: Briefcase, label: "Job Posting", roles: ["admin"] },
    { href: "/Settings", icon: Settings, label: "Settings", roles: ["admin"] },
  ];
  const menuItems = allMenuItems.filter(item => item.roles.includes(user.role));

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenSettings(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              {collapsed ? <PanelRightClose size={22} /> : <PanelRightOpen size={22} />}
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-3 py-4 space-y-1 relative z-20">
              {menuItems.map((item) => {
                  const isActive =
                      url.split("?")[0].toLowerCase().startsWith(item.href.toLowerCase());

                  return (
                      <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-3 rounded-lg text-white font-medium transition-all duration-200
                              ${
                                  isActive
                                      ? "bg-white bg-opacity-30 shadow-lg"
                                      : "hover:bg-white hover:bg-opacity-25"
                              }
                          `}
                      >
                          <item.icon size={21} />
                          {!collapsed && <span>{item.label}</span>}
                      </Link>
                  );
              })}
          </nav>


          {/* User Section */}
          <div className="p-4 border-t border-white border-opacity-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                {user?.name?.charAt(0) ?? "U"}
              </div>
              {!collapsed && (
                <div>
                  <p className="text-white font-semibold">{user?.name}</p>
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
                Welcome back, {user?.name?.split(" ")[0] || "Admin"}!
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
              <div className="relative">
              <button
                onClick={() => setOpenSettings(!openSettings)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Settings size={20} />
              </button>

              {openSettings && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded-lg py-2 z-50 animate-fadeIn"
                >
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-black rounded-lg transition"
                  >
                    <UserPen size={18} />
                    <span className="hidden sm:inline">My Profile</span>
                  </Link>

                  <Link
                    href="/reset-password"
                    className="flex items-center gap-2 px-4 py-2 text-black rounded-lg transition"
                  >
                    <Lock size={18} />
                    <span className="hidden sm:inline">Reset Password</span>
                  </Link>
                  <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="flex items-center gap-2 px-4 py-2 text-black rounded-lg transition"
                  >
                    <LogOut size={18} />
                    <span className="hidden sm:inline">Logout</span>
                  </Link>
                </div>
              )}
            </div>
              
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