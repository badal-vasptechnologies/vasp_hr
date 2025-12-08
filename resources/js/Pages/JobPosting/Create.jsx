import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Textarea, Transition } from '@headlessui/react';
import { Head, useForm, router, Link } from '@inertiajs/react';

export default function JobForm({ locations, workmodes, departments, className = '' }) {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } =
        useForm({
            job_title: '',
            department: '',
            location: '',
            description: '',
            work_mode: '',
            start_date: '',
        });

    const submitJob = (e) => {
        e.preventDefault();
        console.log("Form Data:", data);
        post(route('jobposting.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Job Posting" />
            <section className={`max-w-3xl ${className}`}>
                {/* Header with Back Button */}
                <header className="mb-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold text-black-900 dark:text-black-100">
                            Create Job Posting
                        </h2>
                        <p className="mt-1 text-black-700 dark:text-black-300">
                            Fill the job details and publish it to career listings.
                        </p>
                    </div>

                    <button
                        onClick={() => router.get(route("jobposting.index"))}
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

                {/* Job Form */}
                <form onSubmit={submitJob} className="space-y-6">
                    {/* Job Title */}
                    <div>
                        <InputLabel htmlFor="job_title" value="Job Title" />
                        <TextInput
                            id="job_title"
                            value={data.job_title}
                            onChange={(e) => setData('job_title', e.target.value)}
                            type="text"
                            className="mt-1 block w-full bg-white dark:bg-black-800 text-black-900 dark:text-black-100 border-black-300 dark:border-black-700 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                        <InputError message={errors.job_title} className="mt-2" />
                    </div>

                    {/* Department */}
                    <div>
                        <InputLabel htmlFor="department" value="Department" />

                        <select
                            id="department"
                            value={data.department}
                            onChange={(e) => setData('department', e.target.value)}
                            className="mt-1 block w-full bg-white dark:bg-black-800 text-black-900 dark:text-black-100 border-black-300 dark:border-black-700 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Select Department</option>

                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.name}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>

                        <InputError message={errors.department} className="mt-2" />
                    </div>


                    {/* Location */}
                    <div>
                        <InputLabel htmlFor="location" value="Location" />

                        <select
                            id="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className="mt-1 block w-full bg-white dark:bg-black-800 text-black-900 dark:text-black-100 border-black-300 dark:border-black-700 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Select Location</option>

                            {locations.map((loc) => (
                                <option key={loc.id} value={loc.name}>
                                    {loc.name}
                                </option>
                            ))}
                        </select>

                        <InputError message={errors.location} className="mt-2" />
                    </div>

                    {/* Workmode */}
                    <div>
                        <InputLabel htmlFor="work_mode" value="Work Mode" />

                        <select
                            id="work_mode"
                            value={data.work_mode}
                            onChange={(e) => setData('work_mode', e.target.value)}
                            className="mt-1 block w-full bg-white dark:bg-black-800 text-black-900 dark:text-black-100 border-black-300 dark:border-black-700 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Select Work Mode</option>

                            {workmodes.map((wm) => (
                                <option key={wm.id} value={wm.name}>
                                    {wm.name}
                                </option>
                            ))}
                        </select>

                        <InputError message={errors.work_mode} className="mt-2" />
                    </div>

                    {/* Description */}
                    <div>
                        <InputLabel htmlFor="description" value="Description" />
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full bg-white dark:bg-black-900 text-black-900 dark:text-black-100 border-black-300 dark:border-black-700 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    {/* Start Date */}
                    <div>
                        <InputLabel htmlFor="start_date" value="Post Date" />
                        <input
                            type="date"
                            id="start_date"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                            className="mt-1 block w-full bg-white dark:bg-black-800 text-black-900 dark:text-black-100 border-black-300 dark:border-black-700 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                        <InputError message={errors.start_date} className="mt-2" />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end space-x-2 mt-4">
                        <Link
                            href={route("jobposting.index")}
                            className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded"
                        >
                            Save Job
                        </button>
                    </div>
                </form>
            </section>
        </AuthenticatedLayout>
    );
}
