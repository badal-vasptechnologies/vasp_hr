import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function ShowJob({ jobposting }) {
    return (
        <AuthenticatedLayout>
            <Head title="Job Details" />

            <section className="max-w-4xl mt-6 space-y-6">

                {/* Header */}
                <header className="mb-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-black-900 dark:text-black-100">
                            Job Details
                        </h2>
                    </div>

                    <button
                        onClick={() => router.get(route("jobposting.index"))}
                        className="flex items-center gap-2 px-4 py-2 bg-black-200 dark:bg-black-700 text-black-800 dark:text-black-100 rounded shadow hover:bg-black-300 dark:hover:bg-black-600"
                    >
                        {/* Back arrow icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.293 16.293a1 1 0 010 1.414 1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 111.414 1.414L7.414 10l4.879 4.879z"
                                clipRule="evenodd"
                            />
                        </svg>

                        Back
                    </button>
                </header>

                {/* Job Card */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                            {jobposting.job_title}
                        </h3>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                jobposting.status === 1
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {jobposting.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Department:</span> {jobposting.department}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Location:</span> {jobposting.location}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Work Mode:</span> {jobposting.work_mode}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Start Date:</span> {jobposting.start_date}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Description:</span> {jobposting.description || 'N/A'}
                            </p>
                        </div>
                    </div>

                    {/* Optional Actions */}
                    <div className="mt-4 flex space-x-2">
                        <Link
                            href={route('jobposting.edit', jobposting.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Edit Job
                        </Link>
                        
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
