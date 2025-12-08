import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ candidate, statuses, origins}) {

    const [values, setValues] = useState({
        name: candidate?.name || "",
        email: candidate?.email || "",
        mobile: candidate?.mobile || "",
        address: candidate?.address || "",
        status: candidate?.status || "Pending",
        date_of_apply: candidate?.date_of_apply || "",
        origin_id: candidate?.origin_id || "",
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route("candidate.update", candidate.id), values);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Candidate" />

            <div className="max-w-3xl bg-white shadow p-6 rounded">
                <header className="mb-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-black-900 dark:text-black-100">
                            Edit Candidate
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
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="block mb-1">Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            value={values.mobile}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block mb-1">Address</label>
                        <textarea
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block mb-1">Status</label>
                        <select
                            name="status"
                            value={values.status}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        >
                            {statuses.map((st, idx) => (
                                <option value={st} key={idx}>{st}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date of Apply */}
                    <div>
                        <label className="block mb-1">Date of Apply</label>
                        <input
                            type="date"
                            name="date_of_apply"
                            value={values.date_of_apply}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>

                    {/* Origin */}
                    <div>
                        <label className="block mb-1">Origin of Application</label>
                        <select
                            name="origin_id"
                            value={values.origin_id}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select Origin</option>

                            {origins.map((origin) => (
                                <option key={origin.id} value={origin.id}>
                                    {origin.name}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-2 mt-4">
                        <Link
                            href={route("candidate.index")}
                            className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Update Candidate
                        </button>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
