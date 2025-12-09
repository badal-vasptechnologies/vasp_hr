import { Link, Head } from "@inertiajs/react";

export default function Welcome() {
    return (
        <>
            <Head title="Welcome — VASP HRMS" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
                
                {/* Header */}
                <header className="flex justify-between items-center p-5 bg-white/70 backdrop-blur shadow-sm">
                    <div className="flex items-center space-x-3">
                        <img src="/images/vt.jpeg" width="320"/>
                    </div>

                    <div className="flex space-x-4">
                        <Link
                            href="/login"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                        >
                            Login
                        </Link>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex flex-1 items-center justify-center text-center p-10">
                    <div>
                        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
                            Welcome to VASP HRMS
                        </h2>

                        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
                            A complete cloud-based Human Resource Management System designed to streamline employee lifecycle, payroll, attendance, performance, and internal support — all in one place.
                        </p>

                        <div className="space-x-4">
                            <Link
                                href="/login"
                                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition"
                            >
                                Get Started
                            </Link>

                            <Link
                                href="/about"
                                className="px-6 py-3 border border-indigo-600 text-indigo-700 rounded-lg hover:bg-indigo-50 transition"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="text-center text-gray-600 py-4 text-sm">
                    © {new Date().getFullYear()} VASP Technologies • HRMS Platform
                </footer>

            </div>
        </>
    );
}
