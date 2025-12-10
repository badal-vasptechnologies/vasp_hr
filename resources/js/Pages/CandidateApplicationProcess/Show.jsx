import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Show({ candidate }) {
    const getFileName = (path) => path.split('/').pop();
    const getFileExtension = (filename) => filename.split('.').pop().toLowerCase();

    const isImage = (ext) => ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
    const isPdf = (ext) => ext === 'pdf';
    const isDoc = (ext) => ['doc', 'docx'].includes(ext);

    // Group documents by type
    const groupedDocs = candidate.documents?.reduce((acc, doc) => {
        const ext = getFileExtension(getFileName(doc.file_path));
        const type = isImage(ext) ? 'Images' : isPdf(ext) ? 'PDFs' : isDoc(ext) ? 'Docs' : 'Others';
        if (!acc[type]) acc[type] = [];
        acc[type].push(doc);
        return acc;
    }, {}) || {};

    const tabs = ['Images', 'PDFs', 'Docs', 'Others'];
    const [activeTab, setActiveTab] = useState('Images');

    return (
        <AuthenticatedLayout>
            <Head title="Candidate Details" />
            <section className="max-w-4xl mt-6 space-y-6">
                <header className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-black-900 dark:text-black-100">
                        Candidate Details
                    </h2>

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
                {/* Candidate Info */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">

                    {/* Candidate Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-700">Name</h4>
                            <p className="text-gray-700 dark:text-gray-300">{candidate.name}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-700">Email</h4>
                            <p className="text-gray-700 dark:text-gray-300">{candidate.email}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-700">Mobile</h4>
                            <p className="text-gray-700 dark:text-gray-300">{candidate.mobile}</p>
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
                            <p className="text-gray-700 dark:text-gray-300">{candidate.date_of_apply}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-700">Origin</h4>
                            <p className="text-gray-700 dark:text-gray-300">{candidate.origin?.name ?? "—"}</p>
                        </div>

                        <div className="md:col-span-2">
                            <h4 className="font-semibold text-gray-700">Address</h4>
                            <p className="text-gray-700 dark:text-gray-300">{candidate.address}</p>
                        </div>
                    </div>
                </div>
                {/* Attachments */}
                <div className="p-2">
                    <h4 className="font-semibold text-gray-700 mb-3">Attachments</h4>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-4 border-b">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 font-medium ${
                                    activeTab === tab
                                        ? "border-b-2 border-blue-600 text-blue-600"
                                        : "text-gray-500 hover:text-gray-700"
                                }`}
                            >
                                {tab} ({groupedDocs[tab]?.length || 0})
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(!groupedDocs[activeTab] || groupedDocs[activeTab].length === 0) && (
                            <p className="text-gray-500 text-sm">No {activeTab.toLowerCase()} uploaded</p>
                        )}

                        {groupedDocs[activeTab]?.map((doc) => {
                            const fileName = getFileName(doc.file_path);
                            const ext = getFileExtension(fileName);
                            const url = `/storage/${doc.file_path}`;

                            if (activeTab === 'Images') {
                                return (
                                    <div key={doc.id} className="border p-2 rounded text-center">
                                        <img src={url} alt={fileName} className="max-h-48 mx-auto mb-2" />
                                        <a href={url} target="_blank" className="text-blue-600 text-sm">{fileName}</a>
                                    </div>
                                );
                            }

                            if (activeTab === 'PDFs') {
                                return (
                                    <div key={doc.id} className="w-[800px] border p-2 rounded">
                                        <iframe src={url} className="w-full h-64" title={fileName}></iframe>
                                        <a href={url} target="_blank" className="text-blue-600 text-sm">{fileName}</a>
                                    </div>

                                );
                            }

                            // Docs & Others
                            return (
                                <div key={doc.id} className="border p-2 rounded text-center">
                                    <p className="text-gray-700">{fileName}</p>
                                    <a href={url} target="_blank" className="text-blue-600 text-sm">Download</a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
