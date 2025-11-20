// resources/js/Layouts/AppLayout.jsx
import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, ChevronLeft } from "lucide-react";

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            
            {/* Sidebar */}
            <div className={`bg-white border-r transition-all duration-300 h-full
                ${collapsed ? "w-16" : "w-64"}`}>
                
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    {!collapsed && <h1 className="text-lg font-semibold">VASP HRMS</h1>}
                    
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 rounded hover:bg-gray-200"
                    >
                        {collapsed ? <Menu size={20}/> : <ChevronLeft size={20}/>}
                    </button>
                </div>

                {/* Sidebar Menu */}
                <nav className="mt-4 space-y-2">
                    <Link href="/admin/dashboard" 
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200">
                        <span className="material-icons">dashboard</span>
                        {!collapsed && <span>Dashboard</span>}
                    </Link>

                    <Link href="/admin/employees" 
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200">
                        <span className="material-icons">people</span>
                        {!collapsed && <span>Employees</span>}
                    </Link>
                </nav>

                {/* Bottom User Section */}
                <div className="absolute bottom-4 w-full px-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-700 text-white h-8 w-8 flex items-center justify-center rounded-full">
                            {auth?.user?.name?.charAt(0) ?? "U"}
                        </div>
                        {!collapsed && (
                            <div>
                                <p className="text-sm font-medium">{auth?.user?.name}</p>
                                <p className="text-xs text-gray-500">Admin</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
