import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ candidate, statuses, origins }) {

    const [attachments, setAttachments] = useState([]);
    const [existingAttachments, setExistingAttachments] = useState(candidate.documents || []);

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

    const handleAttachments = (files) => {
        setAttachments((prev) => [...prev, ...files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(values).forEach((key) => formData.append(key, values[key]));

        attachments.forEach((file) => formData.append("attachments[]", file));

        router.post(route("candidate.update", candidate.id), formData, {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Candidate" />

            {/* Header */}
            <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center bg-white shadow p-6 rounded">
                <h2 className="text-2xl font-semibold text-black">Edit Candidate</h2>

                <button
                    onClick={() => router.get(route("candidate.index"))}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300"
                >
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

            {/* Main Two Column Layout */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Left Form */}
                <div className="bg-white shadow p-6 rounded">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="block mb-1 font-semibold">Name</label>
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
                            <label className="block mb-1 font-semibold">Email</label>
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
                            <label className="block mb-1 font-semibold">Mobile</label>
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
                            <label className="block mb-1 font-semibold">Address</label>
                            <textarea
                                name="address"
                                value={values.address}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block mb-1 font-semibold">Status</label>
                            <select
                                name="status"
                                value={values.status}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            >
                                {statuses.map((st) => (
                                    <option value={st} key={st}>{st}</option>
                                ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block mb-1 font-semibold">Date of Apply</label>
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
                            <label className="block mb-1 font-semibold">Origin</label>
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
                        <div className="flex justify-end space-x-2 pt-3">
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
                                Update
                            </button>
                        </div>

                    </form>
                </div>

                {/* Right Attachments Section */}
                <div className="bg-white shadow p-6 rounded min-h-[500px] flex flex-col">
                    <h3 className="text-lg font-semibold mb-3">Attachments</h3>

                    {/* Existing stored files */}
                    {existingAttachments.length > 0 && (
                        <div className="mb-4 border rounded p-3 max-h-48 overflow-y-auto">
                            <h4 className="text-sm font-semibold mb-2">Existing Files</h4>

                            <ul className="space-y-1">
                                {existingAttachments.map((file) => (
                                    <li
                                        key={file.id}
                                        className="flex justify-between text-sm text-gray-700"
                                    >
                                        <a
                                            href={`/storage/${file.file_path}`}
                                            target="_blank"
                                            className="text-blue-600 underline"
                                        >
                                            📄 {file.file_type}
                                        </a>

                                        <button
                                            className="text-red-600"
                                            onClick={() =>
                                                router.delete(route("candidate.attachment.delete", file.id), {
                                                    onSuccess: () => {
                                                        setExistingAttachments(
                                                            existingAttachments.filter((x) => x.id !== file.id)
                                                        );
                                                    },
                                                })
                                            }
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Upload new files */}
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
                    </div>

                    {/* Newly added files */}
                    <div className="mt-4 max-h-48 overflow-y-auto border rounded p-2">
                        {attachments.length === 0 && (
                            <p className="text-gray-500 text-sm">No new files</p>
                        )}

                        <ul className="space-y-1">
                            {attachments.map((file, index) => (
                                <li key={index} className="flex justify-between text-sm text-gray-700">
                                    📄 {file.name}
                                    <button
                                        className="text-red-600"
                                        onClick={() =>
                                            setAttachments(attachments.filter((_, i) => i !== index))
                                        }
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


            </div>
        </AuthenticatedLayout>
    );
}
