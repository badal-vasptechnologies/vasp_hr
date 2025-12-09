import { useEffect, useRef } from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
  Briefcase,
  Users,
  Upload,
  FileText,
  UserCheck,
  Calendar,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export default function Dashboard() {


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="">
                {/* --- Recruitment KPI Cards --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                    {/* Total Job Postings */}
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-white">1</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Total Job Postings</p>
                    </div>

                    {/* Total Candidates */}
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-white">2</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Total Candidates Applied</p>
                    </div>

                    {/* Shortlisted */}
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-white">3</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Shortlisted Candidates</p>
                    </div>

                    {/* Conversion Rate */}
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
                        <h3 className="text-3xl font-bold text-gray-800 dark:text-white">30%</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">Hiring Conversion Rate</p>
                    </div>

                </div>
            </div>
            <div className="">
                <div className="">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
                        HR Management Modules
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* 1. Job Posting */}
                        <Link href="/JobPosting" className="group">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                                <div className="p-6 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                        <Briefcase className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Job Posting</h3>
                                    <p className="text-sm text-gray-500 mt-2">Manage job openings</p>
                                </div>
                            </div>
                        </Link>

                        {/* 2. Candidates */}
                        <Link href="/Candidate" className="group">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                                <div className="p-6 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                        <Users className="w-8 h-8 text-green-600 dark:text-green-300" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Candidates</h3>
                                    <p className="text-sm text-gray-500 mt-2">View & track applicants</p>
                                </div>
                            </div>
                        </Link>

                        {/* 3. External Data Upload */}
                        <Link href="/ExternalDataUpload" className="group">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                                <div className="p-6 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                        <Upload className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Bulk Upload</h3>
                                    <p className="text-sm text-gray-500 mt-2">Import resumes & data</p>
                                </div>
                            </div>
                        </Link>

                        {/* 4. Reports & Analysis */}
                        <Link href="/Reports" className="group">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                                <div className="p-6 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                                        <FileText className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Reports</h3>
                                    <p className="text-sm text-gray-500 mt-2">Analytics & insights</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
