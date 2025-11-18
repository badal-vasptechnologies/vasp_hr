import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Textarea, Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

export default function JobForm({ className = '' }) {
    // const passwordInput = useRef();
    // const currentPasswordInput = useRef();

    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            title: '',
            department: '',
            location: '',
            description: '',
        });

    const submitJob = (e) => {
        e.preventDefault();

        put(route('job.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            // onError: (errors) => {
            //     if (errors.password) {
            //         reset('password', 'password_confirmation');
            //         passwordInput.current.focus();
            //     }

            //     if (errors.current_password) {
            //         reset('current_password');
            //         currentPasswordInput.current.focus();
            //     }
            // },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Create Job Posting
                </h2>

                <p className="mt-1 text-sm text-white">
                    Fill the job details and publish it to carrer listings.
                </p>
            </header>

            <form onSubmit={submitJob} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="title" value="Job Title" />

                    <TextInput
                        id="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        type="text"
                        className="mt-1 block w-full"
                        // autoComplete="current-password"
                        required
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="department" value="Department" />

                    <select>
                        <TextInput
                            id="department"
                            value={data.department}
                            onChange={(e) =>
                                setData('department', e.target.value)
                            }
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                            required
                        />
                        <option value="">Select Department</option>
                        <option value="">HR</option>
                        <option value="">IT</option>
                        <option value="">Sales</option>
                        <option value="">Marketing</option>
                        <option value="">IT Support</option>
                    </select>

                    <InputError message={errors.department} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="location" value="Location" />
                    <select>
                        <TextInput
                            id="location"
                            value={data.location}
                            onChange={(e) =>
                                setData('location', e.target.value)
                            }
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                            required
                        />
                        <option value="">Select Location</option>
                        <option value="">STPI</option>
                        <option value="">ABC</option>
                    </select>

                    <InputError message={errors.location} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />

                    <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        
                        className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-900 dark:text-gray-100"
                        required
                    />

                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="work_mode" value="Work Mode" />

                    <div className="mt-2 flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="work_mode"
                                value="onsite"
                                checked={data.work_mode === 'onsite'}
                                onChange={(e) =>
                                    setData('work_mode', e.target.value)
                                }
                                className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>Onsite</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="work_mode"
                                value="offsite"
                                checked={data.work_mode === 'offsite'}
                                onChange={(e) =>
                                    setData('work_mode', e.target.value)
                                }
                                className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>Offsite</span>
                        </label>
                    </div>

                    <InputError message={errors.work_mode} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="created_at" value="Start Date" />

                    <input
                        type="date"
                        id="created_at"
                        value={data.created_at}
                        onChange={(e) => setData('created_at', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                        required
                    />

                    <InputError message={errors.created_at} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Create Job
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
