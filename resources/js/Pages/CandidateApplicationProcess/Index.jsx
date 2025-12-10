import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FiMaximize, FiMinimize } from "react-icons/fi";

export default function Dashboard({ candidates, filters, statuses }) {
    
    const [list, setList] = useState(candidates.data);
    const [openFeedback, setOpenFeedback] = useState(false);
    const [openComment, setOpenComment] = useState(false);
    const [feedbackText, setFeedbackText] = useState("");
    const [commentText, setCommentText] = useState("");
    const [openMail, setOpenMail] = useState(false);
    const [openWhatsApp, setOpenWhatsApp] = useState(false);

    // Store only selectedCandidateId
    const [selectedCandidateId, setSelectedCandidateId] = useState(() => {
        const saved = localStorage.getItem('selectedCandidateId');
        return saved ? Number(saved) : null;
    });
    const selectedCandidate = list.find(c => c.id === selectedCandidateId);

    const [isFullScreen, setIsFullScreen] = useState(() => {
        const saved = localStorage.getItem('isFullScreen');
        return saved ? JSON.parse(saved) : false;
    });
    const [search, setSearch] = useState(filters?.search ?? "");

    // Persist selectedCandidateId and fullscreen in localStorage
    useEffect(() => {
        if (selectedCandidateId) {
            localStorage.setItem('selectedCandidateId', selectedCandidateId);
        } else {
            localStorage.removeItem('selectedCandidateId');
        }
    }, [selectedCandidateId]);

    useEffect(() => {
        localStorage.setItem('isFullScreen', JSON.stringify(isFullScreen));
    }, [isFullScreen]);

    // Filter candidates locally
    const filteredCandidates = list.filter((c) => {
        const s = search.toLowerCase();
        return (
            c.name.toLowerCase().includes(s) ||
            c.email.toLowerCase().includes(s) ||
            c.mobile.toLowerCase().includes(s)
        );
    });

    const currentIndex = selectedCandidate
        ? filteredCandidates.findIndex(c => c.id === selectedCandidate.id)
        : -1;

    const goNext = () => {
        if (currentIndex >= 0 && currentIndex < filteredCandidates.length - 1) {
            setSelectedCandidateId(filteredCandidates[currentIndex + 1].id);
        }
    };

    const goPrev = () => {
        if (currentIndex > 0) {
            setSelectedCandidateId(filteredCandidates[currentIndex - 1].id);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Candidates Dashboard" />
            {/* HEADER */}
            <header className="mx-5 mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Process Applications</h2>
                <button
                    onClick={() => router.get(route("candidate.index"))}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010 1.414 1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 111.414 1.414L7.414 10l4.879 4.879z" clipRule="evenodd" />
                    </svg>
                    Back
                </button>
            </header>

            <div className={`flex h-screen p-4 gap-4 ${isFullScreen ? "overflow-hidden" : ""}`}>
                {/* LEFT COLUMN */}
                <div className={`${isFullScreen ? "hidden" : "w-1/3"} flex flex-col gap-4`}>
                    <div className="bg-white shadow rounded p-4 flex gap-2">
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Search candidates..."
                        />
                    </div>
                    <div className="flex-1 bg-white shadow rounded p-4 overflow-y-auto">
                        {filteredCandidates.map((c) => (
                            <div
                                key={c.id}
                                className={`p-2 border-b cursor-pointer 
                                    ${selectedCandidateId === c.id ? 'bg-blue-50 font-semibold' : ''}`}
                                onClick={() => setSelectedCandidateId(c.id)}
                            >
                                <div>{c.name}</div>
                                <div className="text-sm text-gray-600">{c.email}</div>
                                <div className="text-sm text-gray-600">{c.mobile}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className={`${isFullScreen ? "fixed top-0 left-0 w-full h-full p-6 z-50" : "w-2/3"} bg-white shadow rounded p-4 overflow-y-auto`}>
                    {selectedCandidate ? (
                        <>
                            {/* ACTION BUTTONS + NAVIGATION */}
                            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                                <h3 className="text-lg font-semibold">{selectedCandidate.name}</h3>
                                <div className="flex gap-2 flex-wrap items-center">
                                    <select
                                        className="px-2 py-1 border rounded"
                                        value={selectedCandidate.status || ''}
                                        onChange={(e) => {
                                            const newStatus = e.target.value;
                                            router.put(
                                                route("candidate.updateStatus", selectedCandidate.id),
                                                { status: newStatus },
                                                { preserveState: true, preserveScroll: true }
                                            );
                                        }}
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setOpenFeedback(true)}
                                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded shadow hover:bg-indigo-200"
                                        >
                                            Feedback
                                        </button>

                                        <button
                                            onClick={() => setOpenComment(true)}
                                            className="px-3 py-1 bg-amber-100 text-amber-700 rounded shadow hover:bg-amber-200"
                                        >
                                            Comment
                                        </button>
                                    </div>

                                    <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Meeting</button>
                                    <button className="px-2 py-1 bg-green-100 text-green-700 rounded">Onboarding</button>
                                    <button className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Call</button>
                                    <button
                                        onClick={() => setOpenMail(true)}
                                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded"
                                    >
                                        Mail
                                    </button>

                                    {openMail && (
                                        <MailModal
                                            selectedCandidate={selectedCandidate}
                                            setOpenMail={setOpenMail}
                                        />
                                    )}
                                    <button
                                        onClick={() => setOpenWhatsApp(true)}
                                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded"
                                    >
                                        WhatsApp
                                    </button>

                                    {openWhatsApp && (
                                        <WhatsAppModal
                                            selectedCandidate={selectedCandidate}
                                            setOpenWhatsApp={setOpenWhatsApp}
                                        />
                                    )}

                                    {openFeedback && (
                                        <FeedbackModal
                                            selectedCandidate={selectedCandidate}
                                            feedbackText={feedbackText}
                                            setFeedbackText={setFeedbackText}
                                            setOpenFeedback={setOpenFeedback}
                                            setList={setList}
                                            setSelectedCandidateId={setSelectedCandidateId}
                                        />
                                    )}

                                    {openComment && (
                                        <CommentModal
                                            selectedCandidate={selectedCandidate}
                                            commentText={commentText}
                                            setCommentText={setCommentText}
                                            setOpenComment={setOpenComment}
                                            setList={setList}
                                            setSelectedCandidateId={setSelectedCandidateId}
                                        />
                                    )}

                                    {isFullScreen && (
                                        <>
                                            <button
                                                onClick={goPrev}
                                                disabled={currentIndex <= 0}
                                                className="px-2 py-1 bg-gray-300 rounded disabled:opacity-40"
                                            >
                                                Previous
                                            </button>
                                            <button
                                                onClick={goNext}
                                                disabled={currentIndex === -1 || currentIndex >= filteredCandidates.length - 1}
                                                className="px-2 py-1 bg-gray-300 rounded disabled:opacity-40"
                                            >
                                                Next
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={() => setIsFullScreen(!isFullScreen)}
                                        className="p-2 rounded bg-gray-100 hover:bg-gray-200"
                                    >
                                        {isFullScreen ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* CV PREVIEW */}
                            <div className="border rounded mb-6">
                                {selectedCandidate.documents?.map((doc) => {
                                    const file = doc.file_path;
                                    const ext = file.split('.').pop().toLowerCase();
                                    const url = `/storage/${file}`;

                                    if (ext === "pdf") return <iframe key={doc.id} src={url} className="w-full h-[75vh] border" />;
                                    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext))
                                        return <img key={doc.id} src={url} className="w-full max-h-[75vh] object-contain mx-auto" />;
                                    return null;
                                })}
                            </div>

                            <h4 className="font-semibold mb-2">Other Documents</h4>
                            {selectedCandidate.documents?.map((doc) => (
                                <a
                                    key={doc.id}
                                    href={`/storage/${doc.file_path}`}
                                    target="_blank"
                                    className="block text-blue-600 mb-1"
                                >
                                    {doc.file_path.split('/').pop()}
                                </a>
                            ))}
                        </>
                    ) : (
                        <p>Select a candidate</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Separate Modal Components for cleaner code
function FeedbackModal({ selectedCandidate, feedbackText, setFeedbackText, setOpenFeedback, setList, setSelectedCandidateId }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[500px]">
                <h2 className="text-xl font-semibold mb-3">Add Feedback</h2>
                <textarea
                    className="w-full border rounded p-2"
                    rows="4"
                    value={feedbackText}
                    onChange={e => setFeedbackText(e.target.value)}
                ></textarea>

                <div className="flex justify-between mt-4">
                    <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setOpenFeedback(false)}>Close</button>
                    <button
                        className="px-3 py-1 bg-indigo-600 text-white rounded"
                        onClick={() => {
                            router.post(route("candidate.addFeedback", selectedCandidate.id), { message: feedbackText }, {
                                preserveScroll: true,
                                onSuccess: (page) => {
                                    const updated = page.props.candidates.data;
                                    setList(updated);
                                    setSelectedCandidateId(selectedCandidate.id);
                                    setFeedbackText("");
                                    setOpenFeedback(false);
                                }
                            });
                        }}
                    >
                        Save
                    </button>
                </div>

                <div className="mt-5 max-h-60 overflow-y-auto">
                    {selectedCandidate.feedbacks?.map(f => (
                        <div key={f.id} className="border-b py-2 flex justify-between">
                            <div>
                                <p className="text-sm">{f.message}</p>
                                <span className="text-xs text-gray-400">{f.created_at}</span>
                            </div>
                           <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.delete(`/Candidate/Feedback/${f.id}`, {
                                        preserveScroll: true,
                                        preserveState: true, // <-- keep current state
                                        replace: true,
                                        onSuccess: (page) => {
                                            setList(page.props.candidates.data);
                                            setSelectedCandidateId(selectedCandidate.id);
                                        }
                                    });
                                }}
                                className="text-red-500 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function CommentModal({ selectedCandidate, commentText, setCommentText, setOpenComment, setList, setSelectedCandidateId }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[500px]">
                <h2 className="text-xl font-semibold mb-3">Add Comment</h2>
                <textarea
                    className="w-full border rounded p-2"
                    rows="4"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                ></textarea>

                <div className="flex justify-between mt-4">
                    <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setOpenComment(false)}>Close</button>
                    <button
                        className="px-3 py-1 bg-indigo-600 text-white rounded"
                        onClick={() => {
                            router.post(route("candidate.addComment", selectedCandidate.id), { message: commentText }, {
                                preserveScroll: true,
                                onSuccess: (page) => {
                                    const updated = page.props.candidates.data;
                                    setList(updated);
                                    setSelectedCandidateId(selectedCandidate.id);
                                    setCommentText("");
                                    setOpenComment(false);
                                }
                            });
                        }}
                    >
                        Save
                    </button>
                </div>

                <div className="mt-5 max-h-60 overflow-y-auto">
                    {selectedCandidate.comments?.map(f => (
                        <div key={f.id} className="border-b py-2 flex justify-between">
                            <div>
                                <p className="text-sm">{f.message}</p>
                                <span className="text-xs text-gray-400">{f.created_at}</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.delete(`/Candidate/Comment/${f.id}`, {
                                        preserveScroll: true,
                                        preserveState: true, // <-- keep current state
                                        replace: true,
                                        onSuccess: (page) => {
                                            setList(page.props.candidates.data);
                                            setSelectedCandidateId(selectedCandidate.id);
                                        }
                                    });
                                }}
                                className="text-red-500 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MailModal({ selectedCandidate, setOpenMail }) {
    const [subject, setSubject] = useState(`Regarding ${selectedCandidate.name}`);
    const [body, setBody] = useState(`Hi ${selectedCandidate.name},\n\nYour application...`);

    const sendMail = () => {
        router.post(route('candidate.sendMail', selectedCandidate.id), { subject, body }, {
            preserveScroll: true,
            onSuccess: () => setOpenMail(false)
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[500px]">
                <h2 className="text-xl font-semibold mb-4">Send Email</h2>

                <div className="mb-3">
                    <label className="block mb-1 font-medium">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div className="mb-3">
                    <label className="block mb-1 font-medium">Body</label>
                    <textarea
                        rows={6}
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        className="px-3 py-1 bg-gray-200 rounded"
                        onClick={() => setOpenMail(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                        onClick={sendMail}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

function WhatsAppModal({ selectedCandidate, setOpenWhatsApp }) {
    const [message, setMessage] = useState(
        `Hi ${selectedCandidate.name},\n\nYour application...`
    );

    const sendWhatsApp = () => {
        const phone = selectedCandidate?.whatsapp_number || selectedCandidate?.mobile;

        if (!phone) {
            alert("WhatsApp number is missing!");
            return;
        }

        const text = encodeURIComponent(message);
        const link = `https://wa.me/${phone}?text=${text}`;

        window.open(link, "_blank");
        setOpenWhatsApp(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[500px]">
                <h2 className="text-xl font-semibold mb-4">Send WhatsApp Message</h2>

                <div className="mb-3">
                    <label className="block mb-1 font-medium">Message</label>
                    <textarea
                        rows={6}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        className="px-3 py-1 bg-gray-200 rounded"
                        onClick={() => setOpenWhatsApp(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-3 py-1 bg-green-600 text-white rounded"
                        onClick={sendWhatsApp}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
