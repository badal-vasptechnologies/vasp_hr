import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function CandidateDetails() {
    // Static candidate data — edit these fields to test the UI
    const candidate = {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@gmail.com',
        phone: '+91 98765 43210',
        address: 'Guwahati',
        feedback:
            'Strong communication skills and good technical knowledge in React & Laravel.',
        remarks: 'Recommended for next round after technical discussion.',
    };

    const [lastAction, setLastAction] = useState(null);

    const handleAction = (type) => {
        // For now just set local state and log — replace with API calls later
        setLastAction(type);
        console.log('Action Selected:', type);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Candidate Details
                </h2>
            }
        >
            <Head title="Candidate Details" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                        <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-gray-100">
                            Candidate Information
                        </h2>

                        <div className="grid grid-cols-1 gap-4 text-gray-800 sm:grid-cols-2 dark:text-gray-200">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Name
                                </p>
                                <p className="mt-1 text-gray-900 dark:text-gray-100">
                                    {candidate.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Email
                                </p>
                                <p className="mt-1 text-gray-900 dark:text-gray-100">
                                    {candidate.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Phone
                                </p>
                                <p className="mt-1 text-gray-900 dark:text-gray-100">
                                    {candidate.phone}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Address
                                </p>
                                <p className="mt-1 text-gray-900 dark:text-gray-100">
                                    {candidate.address}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Feedback
                            </p>
                            <div className="mt-1 rounded-md bg-gray-50 p-3 dark:bg-gray-700">
                                <p className="text-gray-800 dark:text-gray-200">
                                    {candidate.feedback}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Remarks
                            </p>
                            <div className="mt-1 rounded-md bg-gray-50 p-3 dark:bg-gray-700">
                                <p className="text-gray-800 dark:text-gray-200">
                                    {candidate.remarks}
                                </p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                                Resume Preview
                            </p>

                            {/* PDF Preview */}
                            {candidate.resume &&
                                candidate.resume.endsWith('.pdf') && (
                                    <iframe
                                        src={candidate.resume}
                                        title="Resume Preview"
                                        className="h-96 w-full rounded-lg border"
                                    ></iframe>
                                )}

                            {/* DOCX Preview */}
                            {candidate.resume &&
                                candidate.resume.endsWith('.docx') && (
                                    <div className="rounded-md bg-yellow-100 p-4 text-sm text-gray-800 dark:bg-yellow-700 dark:text-gray-200">
                                        <p>
                                            DOCX preview is not supported
                                            directly in browser.
                                        </p>
                                        <p className="mt-1">
                                            You can download and view it
                                            locally:
                                        </p>
                                        <a
                                            href={candidate.resume}
                                            download
                                            className="mt-3 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                        >
                                            Download Resume (.docx)
                                        </a>
                                    </div>
                                )}

                            {/* If no resume */}
                            {!candidate.resume && (
                                <div className="mt-4 rounded-md bg-neutral-700 p-4 text-center text-sm text-red-700 dark:bg-neutral-800 dark:text-red-200">
                                    No Resume Found
                                    <a
                                        href="#"
                                        className="ml-3 rounded-md bg-orange-600 px-3 py-1 text-xs text-white hover:bg-orange-700"
                                    >
                                        Add Resume
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <button
                                type="button"
                                onClick={() => handleAction('accepted')}
                                className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 focus:outline-none"
                            >
                                Accept
                            </button>

                            <button
                                type="button"
                                onClick={() => handleAction('rejected')}
                                className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 focus:outline-none"
                            >
                                Reject
                            </button>

                            <button
                                type="button"
                                onClick={() => handleAction('schedule_meeting')}
                                className="rounded-lg bg-blue-700 px-5 py-2 text-white hover:bg-blue-900 focus:outline-none"
                            >
                                Schedule Meeting
                            </button>

                            {lastAction && (
                                <div className="mt-4 w-full text-sm text-gray-700 dark:text-gray-200">
                                    Last action:{' '}
                                    <span className="font-semibold">
                                        {lastAction}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
