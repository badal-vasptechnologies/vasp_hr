import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";

export default function Show({ meeting }) {

    const deleteMeeting = () => {
        if (!confirm("Are you sure you want to delete this meeting?")) return;

        router.delete(route("meeting.destroy", meeting.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Meeting Details" />

            <section className="max-w-4xl mt-6 space-y-6">

                {/* Header */}
                <header className="mb-6 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">
                        Meeting Details
                    </h2>

                    <button
                        onClick={() =>
                            router.get(route("process.index", meeting.candidate_id))
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-black-200 dark:bg-black-700 
                                   text-black-800 dark:text-black-100 rounded shadow 
                                   hover:bg-black-300 dark:hover:bg-black-600"
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
                </header>

                {/* Meeting Card */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <h4 className="font-semibold text-gray-700">Meeting Id</h4>
                            <p className="text-gray-700 dark:text-gray-300">{meeting.meeting_id}</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-700">Platform</h4>
                            <p className="text-gray-700 dark:text-gray-300 capitalize">
                                {meeting.platform}
                            </p>
                        </div>

                        <div>
                           <h4 className="font-semibold text-gray-700">Date</h4>
                           <p className="text-gray-700 dark:text-gray-300">
                                {new Date(meeting.start_time.replace(" ", "T"))
                                    .toISOString()
                                    .split("T")[0]}
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-700">Time</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                {new Date(meeting.start_time.replace(" ", "T"))
                                    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
                            </p>
                        </div>

                        <div className="md:col-span-2">
                            <h4 className="font-semibold text-gray-700">Candidate</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                {meeting.candidate?.name} — {meeting.candidate?.email}
                            </p>
                        </div>

                        {/* Meeting Link */}
                        {meeting.join_url && (
                            <div className="md:col-span-2">
                                <h4 className="font-semibold text-gray-700">Join Link</h4>

                                <a
                                    href={meeting.join_url}
                                    target="_blank"
                                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded shadow 
                                               hover:bg-blue-700 transition break-all"
                                >
                                    Join Meeting
                                </a>
                            </div>
                        )}

                        {meeting.start_url && (
                            <div className="md:col-span-2">
                                <h4 className="font-semibold text-gray-700">Start Link</h4>

                                <a
                                    href={meeting.start_url}
                                    target="_blank"
                                    className="inline-block px-4 py-2 bg-green-600 text-white rounded shadow 
                                               hover:bg-green-700 transition break-all"
                                >
                                    Start Meeting
                                </a>
                            </div>
                        )}
                        {/* Actions */}
                        <div className="md:col-span-2">
                            <h4 className="font-semibold text-gray-700">Remove Meeting</h4>
                            <button
                                onClick={deleteMeeting}
                                className="inline-block px-4 py-2 bg-red-600 text-white rounded shadow 
                                               hover:bg-red-700 transition break-all"
                            >
                                Delete Meeting
                            </button>
                        </div>
                        {/* Notes / Messages */}
                        {meeting.candidate?.comments && meeting.candidate.comments.length > 0 && (
                            <div className="md:col-span-2">
                                <h4 className="font-semibold text-gray-700 mb-2">Comments</h4>
                                <div className="space-y-3">
                                    {meeting.candidate.comments.map((msg) => (
                                        <div key={msg.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                                {msg.message}
                                            </p>
                                            <p className="text-gray-500 text-xs mt-1">
                                                {msg.user?.name} • {new Date(msg.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
