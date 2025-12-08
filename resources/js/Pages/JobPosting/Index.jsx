import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ jobposting, filters, departments, locations, workmodes }) {

    const filterNow = (newFilters = {}) => {
        router.get(route("jobposting.index"), {
            ...filters,
            ...newFilters,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        router.get(route("jobposting.index"), {}, { replace: true });
    };

    const deleteJob = (id) => {
        if (confirm("Are you sure you want to delete this job posting?")) {
            router.delete(route("jobposting.destroy", id));
        }
    };

    const updateStatus = (id) => {
        router.post(route("jobposting.updateStatus", id)); // you will create this route
    };

    return (
        <AuthenticatedLayout>
            <Head title="Job Posting" />

            <div className="flex justify-between items-center mb-4 p-4 bg-white shadow rounded-lg">
                <h2 className="text-xl font-semibold leading-tight text-black-800 dark:text-black-200">
                    Job Postings
                </h2>

                {/* CREATE BUTTON */}
                <button
                    onClick={() => router.get(route("jobposting.create"))}
                    className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-blue-700"
                >
                    + Create Job
                </button>
            </div>
            <div className="py-6">

                {/* FILTER SECTION */}
                <div className="mb-4 p-4 bg-white shadow rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">

                        {/* Search */}
                        <input
                            type="text"
                            name="search"
                            placeholder="Search job title or location"
                            className="border rounded p-2 w-full"
                            defaultValue={filters.search}
                            onChange={(e) => filterNow({ search: e.target.value })}
                        />

                        {/* Department */}
                        <select
                            name="department"
                            className="border rounded p-2 w-full"
                            value={filters.department || ''}
                            onChange={(e) => filterNow({ department: e.target.value })}
                        >
                            <option value="">All Departments</option>

                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.name}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>

                        {/* Location */}
                        <select
                            name="location"
                            className="border rounded p-2 w-full"
                            value={filters.location || ''}
                            onChange={(e) => filterNow({ location: e.target.value })}
                        >
                            <option value="">All Locations</option>

                            {locations.map((loc) => (
                                <option key={loc.id} value={loc.name}>
                                    {loc.name}
                                </option>
                            ))}
                        </select>

                        {/* Work Mode */}
                        <select
                            name="work_mode"
                            className="border rounded p-2 w-full"
                            value={filters.work_mode || ''}
                            onChange={(e) => filterNow({ work_mode: e.target.value })}
                        >
                            <option value="">Work Mode</option>

                            {workmodes.map((wm) => (
                                <option key={wm.id} value={wm.name}>
                                    {wm.name}
                                </option>
                            ))}
                        </select>


                        {/* Reset Button */}
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Reset Filters
                        </button>

                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
                    <table className="w-full text-left border border-gray-300 border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                {/* SL */}
                                <th 
                                    className="p-3 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                >
                                Sl
                                </th>
                                {/* Job-Id */}
                                <th 
                                    className="p-3 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                >
                                Job-Id 
                                </th>
                                {/* JOB TITLE */}
                                <th
                                    className="p-3 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                    onClick={() =>
                                        filterNow({
                                            sort_by: "job_title",
                                            sort_order: filters.sort_order === "asc" ? "desc" : "asc",
                                        })
                                    }
                                >
                                    Job Title
                                    {filters.sort_by === "job_title"
                                    ? (filters.sort_order === "asc" ? "↑" : "↓")
                                    : "↕"}
                                </th>

                                {/* DEPARTMENT */}
                                <th
                                    className="p-3 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                    onClick={() =>
                                        filterNow({
                                            sort_by: "department",
                                            sort_order: filters.sort_order === "asc" ? "desc" : "asc",
                                        })
                                    }
                                >
                                    Department
                                    {filters.sort_by === "department"
                                    ? (filters.sort_order === "asc" ? "↑" : "↓")
                                    : "↕"}
                                </th>

                                {/* LOCATION */}
                                <th
                                    className="p-3 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                    onClick={() =>
                                        filterNow({
                                            sort_by: "location",
                                            sort_order: filters.sort_order === "asc" ? "desc" : "asc",
                                        })
                                    }
                                >
                                    Location
                                    {filters.sort_by === "location"
                                    ? (filters.sort_order === "asc" ? "↑" : "↓")
                                    : "↕"}
                                </th>

                                {/* WORK MODE */}
                                <th
                                    className="p-3 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                    onClick={() =>
                                        filterNow({
                                            sort_by: "work_mode",
                                            sort_order: filters.sort_order === "asc" ? "desc" : "asc",
                                        })
                                    }
                                >
                                    Work Mode
                                    {filters.sort_by === "work_mode"
                                    ? (filters.sort_order === "asc" ? "↑" : "↓")
                                    : "↕"}
                                </th>

                                {/* START DATE */}
                                <th
                                    className="p-3 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                    onClick={() =>
                                        filterNow({
                                            sort_by: "start_date",
                                            sort_order: filters.sort_order === "asc" ? "desc" : "asc",
                                        })
                                    }
                                >
                                    Post Date
                                    {filters.sort_by === "start_date"
                                    ? (filters.sort_order === "asc" ? "↑" : "↓")
                                    : "↕"}
                                </th>
                                <th
                                    className="p-3 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                    onClick={() =>
                                        filterNow({
                                            sort_by: "status",
                                            sort_order: filters.sort_order === "asc" ? "desc" : "asc",
                                        })
                                    }
                                >
                                    Status
                                    {filters.sort_by === "status"
                                    ? (filters.sort_order === "asc" ? "↑" : "↓")
                                    : "↕"}
                                </th>
                                <th className="p-3 border border-gray-300">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {jobposting.data.map((job,i) => (
                                <tr key={job.id} className="hover:bg-gray-50">
                                    <td className="p-3 border border-gray-300">{i+1}</td>
                                    <td className="p-3 border border-gray-300">{'xyz-'}{i+1000}</td>
                                    <td className="p-3 border border-gray-300">{job.job_title}</td>
                                    <td className="p-3 border border-gray-300">{job.department}</td>
                                    <td className="p-3 border border-gray-300">{job.location}</td>
                                    <td className="p-3 border border-gray-300">{job.work_mode}</td>
                                    <td className="p-3 border border-gray-300">{job.start_date}</td>
                                    <td className="p-3 border border-gray-300">
                                        <span
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                job.status === 1
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {job.status === 1 ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="p-3 border border-gray-300">
                                        <div className="flex items-center space-x-4">
                                            
                                            {/* VIEW */}
                                            <Link
                                                href={route("jobposting.show", job.id)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                View
                                            </Link>

                                            {/* EDIT */}
                                            <Link
                                                href={route("jobposting.edit", job.id)}
                                                className="text-green-600 hover:underline"
                                            >
                                                Edit
                                            </Link>

                                            {/* DELETE */}
                                            <button
                                                onClick={() => deleteJob(job.id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>

                                            {/* STATUS UPDATE */}
                                            <button
                                                onClick={() => updateStatus(job.id)}
                                                className="px-2 py-1 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600"
                                            >
                                                Update Status
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

                {/* PAGINATION */}
                <div className="mt-5 space-x-2 mx-4" align="left">
                    {jobposting.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={link.url === null}
                            onClick={() => link.url && router.get(link.url)}
                            className={`px-3 py-1 rounded ${
                                link.active
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
