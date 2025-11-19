import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`w-full space-y-6`}>
            <div className="mt-6 justify-center">
                <div className="py-12">
                    <div className="mx-auto w-full sm:px-6 lg:px-8">
                        <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                            <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800 dark:text-gray-100">
                                List of all Uploaded files
                            </h2>
                            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Sl No.
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Candidate Name
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Email ID
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Phone No
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Address
                                        </th>
                                        {/* <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Work Mode
                                        </th> */}
                                        <th className="px-4 py-2 pl-[45px] text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Uploaded Resume
                                        </th>
                                        <th className="px-4 py-2 text-center text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
                                    <tr>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            1
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Name 1
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            user1@gmail.com
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            9876543210
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Guwahti
                                        </td>
                                        {/* <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Onsite
                                        </td> */}
                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                {/* View Button */}
                                                <a
                                                    href="#"
                                                    className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                                                >
                                                    View
                                                </a>

                                                {/* Download Button */}
                                                <a
                                                    href="#"
                                                    className="font-medium text-green-600 hover:text-green-800 hover:underline"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </td>

                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                {/* Email Button */}
                                                <a
                                                    href="mailto:testuser@gmail.com"
                                                    className="font-medium text-green-600 hover:text-green-800 hover:underline"
                                                >
                                                    Email
                                                </a>

                                                {/* Call Button */}
                                                <a
                                                    href="tel:9876543210"
                                                    className="font-medium text-purple-600 hover:text-purple-800 hover:underline"
                                                >
                                                    Call
                                                </a>
                                                <button className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                    Select
                                                </button>

                                                <button className="font-medium text-red-600 hover:text-red-800 hover:underline">
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            2
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Name 2
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            User2@gmail.com
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            9754217892
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Guwahti
                                        </td>
                                        {/* <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Onsite
                                        </td> */}
                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                {/* View Button */}
                                                <a
                                                    href="#"
                                                    className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                                                >
                                                    View
                                                </a>

                                                {/* Download Button */}
                                                <a
                                                    href="#"
                                                    className="font-medium text-green-600 hover:text-green-800 hover:underline"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </td>

                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                {/* Email Button */}
                                                <a
                                                    href="mailto:testuser@gmail.com"
                                                    className="font-medium text-green-600 hover:text-green-800 hover:underline"
                                                >
                                                    Email
                                                </a>

                                                {/* Call Button */}
                                                <a
                                                    href="tel:9876543210"
                                                    className="font-medium text-purple-600 hover:text-purple-800 hover:underline"
                                                >
                                                    Call
                                                </a>
                                                <button className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                    Select
                                                </button>

                                                <button className="font-medium text-red-600 hover:text-red-800 hover:underline">
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            3
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Name 3
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            user3@gmail.com
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            6004532765
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Guwahti
                                        </td>
                                        {/* <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Onsite
                                        </td> */}
                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                {/* View Button */}
                                                <a
                                                    href="#"
                                                    className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                                                >
                                                    View
                                                </a>

                                                {/* Download Button */}
                                                <a
                                                    href="#"
                                                    className="font-medium text-green-600 hover:text-green-800 hover:underline"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </td>

                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                {/* Email Button */}
                                                <a
                                                    href="mailto:testuser@gmail.com"
                                                    className="font-medium text-green-600 hover:text-green-800 hover:underline"
                                                >
                                                    Email
                                                </a>

                                                {/* Call Button */}
                                                <a
                                                    href="tel:9876543210"
                                                    className="font-medium text-purple-600 hover:text-purple-800 hover:underline"
                                                >
                                                    Call
                                                </a>
                                                <button className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                    Select
                                                </button>

                                                <button className="font-medium text-red-600 hover:text-red-800 hover:underline">
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            4
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Name 4
                                        </td>

                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            user4@gmail.com
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            9982345671
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Guwahti
                                        </td>
                                        {/* <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Onsite
                                        </td> */}
                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                {/* View Button */}
                                                <a
                                                    href="#"
                                                    className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                                                >
                                                    View
                                                </a>

                                                {/* Download Button */}
                                                <a
                                                    href="#"
                                                    className="font-medium text-green-600 hover:text-green-800 hover:underline"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </td>

                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                {/* Email Button */}
                                                <a
                                                    href="mailto:testuser@gmail.com"
                                                    className="font-medium text-green-600 hover:text-green-800 hover:underline"
                                                >
                                                    Email
                                                </a>

                                                {/* Call Button */}
                                                <a
                                                    href="tel:9876543210"
                                                    className="font-medium text-purple-600 hover:text-purple-800 hover:underline"
                                                >
                                                    Call
                                                </a>
                                                <button className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                    Select
                                                </button>

                                                <button className="font-medium text-red-600 hover:text-red-800 hover:underline">
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            5
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Name 5
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            user5@gmail.com
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            8976543218
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Guwahti
                                        </td>
                                        {/* <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Onsite
                                        </td> */}
                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                {/* View Button */}
                                                <a
                                                    href="#"
                                                    className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                                                >
                                                    View
                                                </a>

                                                {/* Download Button */}
                                                <a
                                                    href="#"
                                                    className="font-medium text-green-600 hover:text-green-800 hover:underline"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </td>

                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                {/* Email Button */}
                                                <a
                                                    href="mailto:testuser@gmail.com"
                                                    className="font-medium text-green-600 hover:text-green-800 hover:underline"
                                                >
                                                    Email
                                                </a>

                                                {/* Call Button */}
                                                <a
                                                    href="tel:9876543210"
                                                    className="font-medium text-purple-600 hover:text-purple-800 hover:underline"
                                                >
                                                    Call
                                                </a>
                                                <button className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                    Select
                                                </button>

                                                <button className="font-medium text-red-600 hover:text-red-800 hover:underline">
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            6
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Name 6
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            user6@gmail.com
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            7896543218
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Guwahti
                                        </td>
                                        {/* <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Onsite
                                        </td> */}
                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                {/* View Button */}
                                                <a
                                                    href="#"
                                                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                                >
                                                    View
                                                </a>

                                                {/* Download Button */}
                                                <a
                                                    href="#"
                                                    className="font-medium text-green-600 hover:text-green-800 hover:underline"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </td>

                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                {/* Email Button */}
                                                <a
                                                    href="mailto:testuser@gmail.com"
                                                    className="font-medium text-green-600 hover:text-green-800 hover:underline"
                                                >
                                                    Email
                                                </a>

                                                {/* Call Button */}
                                                <a
                                                    href="tel:9876543210"
                                                    className="font-medium text-purple-600 hover:text-purple-800 hover:underline"
                                                >
                                                    Call
                                                </a>
                                                <button className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                    Select
                                                </button>

                                                <button className="font-medium text-red-600 hover:text-red-800 hover:underline">
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
