import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import JobForm from './Partials/JobForm';
import JobTable from './Partials/ViewList';

// import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
// Drag & Drop File Component
function DragDrop() {
    const fileTypes = ['JPG', 'PNG', 'GIF'];
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
        setFile(file);
        console.log('Uploaded File:', file);
    };
    return (
        <div className="mt-6 text-center">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                Upload File
            </h2>
            <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
            />
        </div>
    );
}

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    External Upload File 
                </h2>
            }
        >
            <Head title="Job Posting" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                   

                    <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                        <DragDrop />
                    </div>

                    

                    {/* <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <DeleteUserForm className="max-w-xl" />
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
