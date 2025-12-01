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
                        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-4">
                    Job Posting List
                </h2>
                            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Sl No.
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Title
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Department
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Description
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Location
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Work Mode
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-600 dark:text-gray-300">
                                            Created At
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
                                            Software Developer
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            IT
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            This is JD
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Guwahti
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Onsite
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            2025-11-18
                                        </td>
                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                <button className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                    Edit
                                                </button>
                                                <button className="font-medium text-red-600 hover:text-red-800 hover:underline">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            2
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            HR Executive
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Human Resources
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            This is JD
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Guwahti
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Onsite
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            2025-11-17
                                        </td>
                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                <button className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                    Edit
                                                </button>
                                                <button className="font-medium text-red-600 hover:text-red-800 hover:underline">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            3
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Dot Net Developer
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            IT
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            This is JD
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Guwahti
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Onsite
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            2025-10-10
                                        </td>
                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                <button className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                    Edit
                                                </button>
                                                <button className="font-medium text-red-600 hover:text-red-800 hover:underline">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            4
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            IT Support
                                        </td>

                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Support
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            This is JD
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Guwahti
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Onsite
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            2025-11-12
                                        </td>
                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                <button className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                    Edit
                                                </button>
                                                <button className="font-medium text-red-600 hover:text-red-800 hover:underline">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            5
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Programmer
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            IT
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            This is JD
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Guwahti
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Onsite
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            2025-11-13
                                        </td>
                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                <button className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                    Edit
                                                </button>
                                                <button className="font-medium text-red-600 hover:text-red-800 hover:underline">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            6
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Tech Lead
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            IT
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            This is JD
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Guwahti
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            Onsite
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                            2025-11-14
                                        </td>
                                        <td className="px-4 py-2 text-center text-sm text-gray-700 dark:text-gray-300">
                                            <div className="flex justify-center space-x-4">
                                                <button className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                                    Edit
                                                </button>
                                                <button className="font-medium text-red-600 hover:text-red-800 hover:underline">
                                                    Delete
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
