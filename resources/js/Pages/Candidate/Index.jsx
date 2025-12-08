import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ candidates, filters, origins, statuses }) {

    const filterNow = (newFilters = {}) => {
        router.get(route("candidate.index"), {
            ...filters,
            ...newFilters,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        router.get(route("candidate.index"), {}, { replace: true });
    };

    const deleteCandidate = (id) => {
        if (confirm("Are you sure you want to delete this candidate?")) {
            router.delete(route("candidate.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Candidates" />

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4 p-4 bg-white shadow rounded-lg">
                <h2 className="text-xl font-semibold text-black">
                    Candidate List
                </h2>

                <button
                    onClick={() => router.get(route("candidate.create"))}
                    className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
                >
                    + Add Candidate
                </button>
            </div>

            <div className="py-6">

                {/* FILTER AREA */}
                <div className="mb-4 p-4 bg-white shadow rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search name or email"
                            className="border rounded p-2 w-full"
                            defaultValue={filters.search}
                            onChange={(e) => filterNow({ search: e.target.value })}
                        />

                        {/* Status Filter */}
                        <select
                            name="status"
                            className="border rounded p-2 w-full"
                            value={filters.status || ''}
                            onChange={(e) => filterNow({ status: e.target.value })}
                        >
                            <option value="">All Status</option>

                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>

                        {/* Origin Filter */}
                        <select
                            name="origin_id"
                            className="border rounded p-2 w-full"
                            value={filters.origin_id || ''}
                            onChange={(e) =>
                                filterNow({ origin_id: e.target.value })
                            }
                        >
                            <option value="">All Origins</option>

                            {origins.map((origin) => (
                                <option key={origin.id} value={origin.name}>
                                    {origin.name}
                                </option>
                            ))}
                        </select>

                        {/* Reset */}
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Reset
                        </button>

                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
                    <table className="w-full text-left border border-gray-300 border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">

                                <th className="p-3 border border-gray-300">Sl</th>

                                {/* NAME */}
                                <th
                                    className="p-3 border border-gray-300 cursor-pointer hover:bg-gray-200"
                                    onClick={() =>
                                        filterNow({
                                            sort_by: "name",
                                            sort_order: filters.sort_order === "asc" ? "desc" : "asc",
                                        })
                                    }
                                >
                                    Name
                                    {filters.sort_by === "name"
                                        ? (filters.sort_order === "asc" ? "↑" : "↓")
                                        : "↕"}
                                </th>

                                {/* EMAIL */}
                                <th className="p-3 border border-gray-300">Email</th>

                                {/* MOBILE */}
                                <th className="p-3 border border-gray-300">Mobile</th>

                                {/* STATUS */}
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

                                {/* DATE OF APPLY */}
                                <th className="p-3 border border-gray-300">Date of Apply</th>

                                {/* ORIGIN */}
                                <th className="p-3 border border-gray-300">Origin</th>

                                {/* ACTION */}
                                <th className="p-3 border border-gray-300">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {candidates.data.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50">
                                    <td className="p-3 border border-gray-300">{c.id}</td>
                                    <td className="p-3 border border-gray-300">{c.name}</td>
                                    <td className="p-3 border border-gray-300">{c.email}</td>
                                    <td className="p-3 border border-gray-300">{c.mobile}</td>

                                    <td className="p-3 border border-gray-300">
                                        <span
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                c.status === "Selected"
                                                    ? "bg-green-100 text-green-800"
                                                    : c.status === "Rejected"
                                                    ? "bg-red-100 text-red-800"
                                                    : c.status === "Shortlisted"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {c.status}
                                        </span>
                                    </td>

                                    <td className="p-3 border border-gray-300">{c.date_of_apply}</td>

                                    <td className="p-3 border border-gray-300">{c.origin?.name || "—"}</td>


                                    <td className="p-3 border border-gray-300">
                                        <div className="flex items-center space-x-4">

                                            <Link
                                                href={route("candidate.show", c.id)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                View
                                            </Link>

                                            <Link
                                                href={route("candidate.edit", c.id)}
                                                className="text-green-600 hover:underline"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => deleteCandidate(c.id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
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
                    {candidates.links.map((link, index) => (
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
