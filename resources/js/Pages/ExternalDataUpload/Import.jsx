import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Import() {

    const { data, setData, post, processing, errors } = useForm({
        file: null,
    });

    const [dragActive, setDragActive] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("candidate.import"));
    };

    // Handle drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // Handle drop file
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setData("file", e.dataTransfer.files[0]);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Import Candidates
                </h2>
            }
        >
            <Head title="Import Candidates" />
            
                <div className="py-8 max-w-4xl">
                <header className="mb-6 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-semibold text-black-900 dark:text-black-100">
                                Upload Excel / CSV File
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
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

                    <form onSubmit={submit} className="space-y-4">

                        {/* DRAG & DROP AREA */}
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition
                                ${dragActive ? "border-blue-500 bg-blue-50 dark:bg-gray-700" : "border-gray-300 dark:border-gray-600"}
                            `}
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            <p className="text-gray-600 dark:text-gray-300">
                                {data.file
                                    ? `Selected: ${data.file.name}`
                                    : "Drag & drop your file here, or click to browse"}
                            </p>

                            <input
                                id="fileInput"
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={(e) => setData("file", e.target.files[0])}
                                className="hidden"
                            />
                        </div>

                        {/* ERROR MESSAGE */}
                        {errors.file && <p className="text-red-600 text-sm">{errors.file}</p>}

                        {/* SUBMIT BUTTON */}
                        <button
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 disabled:opacity-50"
                        >
                            Upload & Import
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
