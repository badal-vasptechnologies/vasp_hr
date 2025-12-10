import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";

export default function Index({ origins, departments, locations, workModes, settings }) {

    // Read tab from URL query if exists
    const urlTab = new URLSearchParams(window.location.search).get("tab");

    const [activeTab, setActiveTab] = useState(urlTab || "origins");

    const changeTab = (tab) => {
        setActiveTab(tab);

        // Push tab to browser URL (without page reload)
        router.get(
            route("setting.index"), // your index route
            { tab },
            {
                replace: true,
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const addItem = (routeName, name) => {
        router.post(route(routeName), { name }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => changeTab(activeTab),
        });
    };

    const deleteItem = (routeName, id) => {
        if (confirm("Delete this item?")) {
            router.delete(route(routeName, id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => changeTab(activeTab),
            });
        }
    };

    const handleUpdate = (id, updatedData) => {
        setOrigins(origins.map(i => i.id === id ? updatedData : i));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Settings" />

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">System Settings</h1>

                {/* ---------------- TABS ---------------- */}
                <div className="flex border-b mb-4 space-x-4">
                    <button
                        className={`pb-2 ${activeTab === "origins" ? "border-b-2 border-blue-600 font-bold" : "text-gray-600"}`}
                        onClick={() => changeTab("origins")}
                    >
                        Origins
                    </button>

                    <button
                        className={`pb-2 ${activeTab === "departments" ? "border-b-2 border-blue-600 font-bold" : "text-gray-600"}`}
                        onClick={() => changeTab("departments")}
                    >
                        Departments
                    </button>

                    <button
                        className={`pb-2 ${activeTab === "locations" ? "border-b-2 border-blue-600 font-bold" : "text-gray-600"}`}
                        onClick={() => changeTab("locations")}
                    >
                        Locations
                    </button>

                    <button
                        className={`pb-2 ${activeTab === "workModes" ? "border-b-2 border-blue-600 font-bold" : "text-gray-600"}`}
                        onClick={() => changeTab("workModes")}
                    >
                        Work Modes
                    </button>

                    <button
                        className={`pb-2 ${activeTab === "settings" ? "border-b-2 border-blue-600 font-bold" : "text-gray-600"}`}
                        onClick={() => changeTab("settings")}
                    >
                        Configuration
                    </button>

                </div>

                {/* ---------------- CONTENT ---------------- */}
                <div className="mt-4">
                    {activeTab === "origins" && (
                        <SettingOriginBox
                            title="Origins"
                            items={origins}
                            onSave={(data) =>
                                router.post(route("setting.origin.store"), data, {
                                    preserveState: true,
                                    preserveScroll: true,
                                    onSuccess: () => changeTab("origins"),
                                })
                            }
                            onUpdate={(id, data) =>
                                router.put(route("setting.origin.update", id), data, {
                                    preserveState: true,
                                    preserveScroll: true,
                                    onSuccess: () => changeTab("origins"),
                                })
                            }
                            onDelete={(id) =>
                                router.delete(route("setting.origin.delete", id), {
                                    preserveState: true,
                                    preserveScroll: true,
                                    onSuccess: () => changeTab("origins"),
                                })
                            }
                        />
                    )}

                    {activeTab === "departments" && (
                        <SettingBox
                            title="Departments"
                            items={departments}
                            onAdd={(name) => addItem("setting.department.store", name)}
                            onDelete={(id) => deleteItem("setting.department.delete", id)}
                        />
                    )}

                    {activeTab === "locations" && (
                        <SettingBox
                            title="Locations"
                            items={locations}
                            onAdd={(name) => addItem("setting.location.store", name)}
                            onDelete={(id) => deleteItem("setting.location.delete", id)}
                        />
                    )}

                    {activeTab === "workModes" && (
                        <SettingBox
                            title="Work Modes"
                            items={workModes}
                            onAdd={(name) => addItem("setting.workmode.store", name)}
                            onDelete={(id) => deleteItem("setting.workmode.delete", id)}
                        />
                    )}

                    {activeTab === "settings" && (
                        <SettingConfigBox
                            items={settings}
                            onAdd={(data) =>
                                router.post(route("setting.config.store"), data)
                            }
                            onUpdate={(id, data) =>
                                router.put(route("setting.config.update", id), data)
                            }
                            onDelete={(id) =>
                                router.delete(route("setting.config.delete", id))
                            }
                            onStatus={(id) =>
                                router.patch(route("setting.config.status", id))
                            }
                        />
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}


/* ---------------------- SettingBox ---------------------- */
function SettingBox({ title, items, onAdd, onDelete }) {
    const [inputValue, setInputValue] = useState("");

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="flex mb-3">
                <input
                    type="text"
                    value={inputValue}
                    placeholder={`Add ${title}`}
                    className="border p-2 w-full rounded"
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    className="ml-2 px-3 py-2 bg-blue-600 text-white rounded"
                    onClick={() => {
                        onAdd(inputValue);
                        setInputValue("");
                    }}
                >
                    Add
                </button>
            </div>

            <ul className="space-y-2">
                {items.map((i) => (
                    <li key={i.id} className="flex justify-between p-2 border rounded">
                        {i.name}
                        <button
                            className="text-red-600"
                            onClick={() => onDelete(i.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


/* ---------------------- OriginBox ---------------------- */
function SettingOriginBox({ title, items, onSave, onDelete, onUpdate }) {
    const [form, setForm] = useState({
        name: "",
        api_endpoint: "",
        api_username: "",
        api_password: "",
        api_key: "",
    });

    // selected record
    const [selectedId, setSelectedId] = useState(null);

    // edit mode
    const [isEditing, setIsEditing] = useState(false);

    const selectedItem = items.find((i) => i.id === selectedId);

    const handleSubmit = () => {
        onSave(form);
        setForm({ name: "", api_endpoint: "", api_username: "", api_password: "", api_key: "" });
    };

    const handleUpdate = () => {
        onUpdate(selectedId, form);
        setIsEditing(false);
    };

    const startEditing = () => {
        if (!selectedItem) return;
        setIsEditing(true);
        setForm({ ...selectedItem });
    };

    // auto-select first item by default
    useEffect(() => {
        if (items.length > 0 && selectedId === null) {
            setSelectedId(items[0].id);
        }
    }, [items]);

    return (
        <div className="bg-white shadow rounded-lg">
            {/* ADD FORM */}
            <div className="space-y-3 mb-6" align="right">
                {["name", "api_endpoint", "api_username", "api_password", "api_key"].map((field) => (
                    <input
                        key={field}
                        className="w-full border p-2 rounded"
                        placeholder={field.replace("_", " ").toUpperCase()}
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    />
                ))}

                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={handleSubmit}
                >
                    Add Origin
                </button>
            </div>

            {/* ------------------ TWO COLUMN LAYOUT ------------------ */}
            <div className="flex">
                {/* LEFT LIST */}
                <div className="w-48 border-r pr-4">
                    <ul className="space-y-2">
                        {items.map((i) => (
                            <li key={i.id}>
                                <button
                                    className={`w-full text-left p-2 rounded ${
                                        selectedId === i.id
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                    onClick={() => {
                                        setSelectedId(i.id);
                                        setIsEditing(false);
                                    }}
                                >
                                    {i.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                
                <div className="flex-1 pl-6 border border-2">
                    {!selectedItem ? (
                        <p className="text-gray-500">Select an item from the left.</p>
                    ) : (
                        <>
                            {/* HEADER */}
                            <div className="flex justify-between items-center mb-4 px-2">
                                <h3 className="text-lg font-semibold">&nbsp;</h3>

                                <div className="flex gap-3">
                                    <button
                                        className="text-blue-600"
                                        onClick={startEditing}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="text-red-600"
                                        onClick={() => onDelete(selectedItem.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* VIEW MODE */}
                            {!isEditing && (
                                <div className="space-y-3 text-sm px-2">
                                    <p><strong>Endpoint:</strong> {selectedItem.api_endpoint || "—"}</p>
                                    <p><strong>Username:</strong> {selectedItem.api_username || "—"}</p>
                                    <p><strong>Password:</strong> {selectedItem.api_password ? "********" : "—"}</p>
                                    <p><strong>API Key:</strong> {selectedItem.api_key ? "********" : "—"}</p>
                                </div>
                            )}

                            {/* EDIT MODE */}
                            {isEditing && (
                                <div className="space-y-3 text-sm">
                                    {["name", "api_endpoint", "api_username", "api_password", "api_key"].map((field) => (
                                        <input
                                            key={field}
                                            className="w-full border p-2 rounded"
                                            placeholder={field.replace("_", " ").toUpperCase()}
                                            value={form[field]}
                                            onChange={(e) =>
                                                setForm({ ...form, [field]: e.target.value })
                                            }
                                        />
                                    ))}

                                    <button
                                        className="px-4 py-2 bg-green-600 text-white rounded"
                                        onClick={handleUpdate}
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        className="px-4 py-2 bg-gray-300 rounded ml-3"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ---------------------- Settings ---------------------- */
function SettingConfigBox({ items, onAdd, onUpdate, onDelete, onStatus }) {
    const [form, setForm] = useState({ name: "", value: "" });
    const [editId, setEditId] = useState(null);

    const handleSubmit = () => {
        onAdd(form);
        setForm({ name: "", value: "" });
    };

    const handleUpdate = () => {
        onUpdate(editId, form);
        setEditId(null);
        setForm({ name: "", value: "" });
    };

    const startEdit = (item) => {
        setEditId(item.id);
        setForm({ name: item.name, value: item.value });
    };

    return (
        <div className="bg-white p-4 shadow rounded">

            {/* ADD / EDIT FORM */}
            <div className="flex gap-3 mb-4">
                <input
                    className="border p-2 rounded w-1/3"
                    placeholder="Key (mobile/email/whatsapp)"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    className="border p-2 rounded w-1/3"
                    placeholder="Value"
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: e.target.value })}
                />

                {editId ? (
                    <button className="px-4 bg-green-600 text-white rounded" onClick={handleUpdate}>
                        Update
                    </button>
                ) : (
                    <button className="px-4 bg-blue-600 text-white rounded" onClick={handleSubmit}>
                        Add
                    </button>
                )}
            </div>

            {/* LIST */}
            <table className="w-50 border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-left">Key</th>
                        <th className="p-2 text-left">Value</th>
                        <th className="p-2 text-center">Status</th>
                        <th className="p-2 text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((i) => (
                        <tr key={i.id} className="border-b">
                            <td className="p-2">{i.name}</td>
                            <td className="p-2">{i.value}</td>
                            <td className="p-2 text-center">
                                <button
                                    className={`px-3 py-1 rounded text-white ${i.status ? 'bg-green-600' : 'bg-gray-500'}`}
                                    onClick={() => onStatus(i.id)}
                                >
                                    {i.status ? "Active" : "Inactive"}
                                </button>
                            </td>

                            <td className="p-2 text-center">
                                <button className="text-blue-600 mr-3" onClick={() => startEdit(i)}>
                                    Edit
                                </button>

                                <button className="text-red-600" onClick={() => onDelete(i.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


