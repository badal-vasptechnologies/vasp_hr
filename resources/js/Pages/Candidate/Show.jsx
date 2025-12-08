import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ candidate }) {
    return (
        <AuthenticatedLayout>
            <Head title="Candidate Details" />

            <div className="max-w-3xl p-6 bg-white shadow rounded-lg">

                <header className="mb-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-black-900 dark:text-black-100">
                            Candidate Details
                        </h2>
                    </div>

                    <button
                        onClick={() => router.get(route("candidate.index"))}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <h4 className="font-semibold text-gray-700">Name</h4>
                        <p>{candidate.name}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-700">Email</h4>
                        <p>{candidate.email}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-700">Mobile</h4>
                        <p>{candidate.mobile}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-700">Status</h4>
                        <span className={`px-2 py-1 text-xs rounded ${
                            candidate.status === "Selected" ? "bg-green-100 text-green-800" :
                            candidate.status === "Rejected" ? "bg-red-100 text-red-800" :
                            candidate.status === "Shortlisted" ? "bg-blue-100 text-blue-800" :
                            "bg-gray-100 text-gray-800"
                        }`}>
                            {candidate.status}
                        </span>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-700">Date of Apply</h4>
                        <p>{candidate.date_of_apply}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-gray-700">Origin of Application</h4>
                        <p>{candidate.origin?.name ?? "—"}</p>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="font-semibold text-gray-700">Address</h4>
                        <p>{candidate.address}</p>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
