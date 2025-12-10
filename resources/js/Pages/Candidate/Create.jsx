import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ statuses, origins, errors: serverErrors }) {

    const [attachments, setAttachments] = useState([]);
    const [values, setValues] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        status: "Pending",
        date_of_apply: "",
        origin_id: "",
    });

    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // Handle file attachments
    const handleAttachments = (files) => {
        setAttachments((prev) => [...prev, ...files]);
    };

    // Simple client-side validation
    const validate = () => {
        const newErrors = {};
        if (!values.name.trim()) newErrors.name = "Name is required";
        if (!values.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(values.email)) newErrors.email = "Email is invalid";
        if (!values.mobile.trim()) newErrors.mobile = "Mobile is required";
        if (!values.origin_id) newErrors.origin_id = "Origin is required";
        if (!values.date_of_apply) newErrors.date_of_apply = "Date of Apply is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const formData = new FormData();

        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });

        attachments.forEach((file) => {
            formData.append('attachments[]', file);
        });

        router.post(route("candidate.store"), formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Add Candidate" />

            {/* Header */}
            <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center bg-white shadow p-6 rounded">
                <h2 className="text-2xl font-semibold text-black-900">Add Candidate</h2>

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
            </div>

            {/* Two-column layout */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT: Form */}
                <div className="bg-white shadow p-6 rounded">
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
                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
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
                            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
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
                            {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}
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
                            {errors.date_of_apply && <p className="text-red-600 text-sm mt-1">{errors.date_of_apply}</p>}
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
                                    <option key={origin.id} value={origin.id}>{origin.name}</option>
                                ))}
                            </select>
                            {errors.origin_id && <p className="text-red-600 text-sm mt-1">{errors.origin_id}</p>}
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
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Save Candidate
                            </button>
                        </div>
                    </form>
                </div>

                {/* RIGHT: Attachments */}
                <div className="flex flex-col gap-3">
                    <div
                        className="border-2 border-dashed border-gray-400 hover:bg-gray-50 transition flex-1 p-4 rounded text-center flex flex-col items-center justify-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            handleAttachments(Array.from(e.dataTransfer.files));
                        }}
                    >
                        <p className="text-gray-600 mb-3">Drag & drop files here</p>

                        <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded">
                            Browse Files
                            <input
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => handleAttachments(Array.from(e.target.files))}
                            />
                        </label>

                        {attachments.length > 0 && (
                            <ul className="mt-4 w-full text-left space-y-1">
                                {attachments.map((file, index) => (
                                    <li key={index} className="text-sm text-gray-700 flex justify-between items-center">
                                        📄 {file.name}
                                        <button
                                            className="text-red-600 ml-2"
                                            onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
