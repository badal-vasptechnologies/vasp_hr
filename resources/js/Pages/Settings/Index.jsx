import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";

export default function Index({ origins, departments, locations, workModes }) {

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
function SettingOriginBox({ title, items, onSave, onDelete }) {
    const [form, setForm] = useState({
        name: "",
        api_endpoint: "",
        api_username: "",
        api_password: "",
        api_key: "",
    });

    const handleSubmit = () => {
        onSave(form);
        setForm({ name: "", api_endpoint: "", api_username: "", api_password: "", api_key: "" });
    };

    return (
        <div className="bg-white shadow rounded-lg">
            {/* ADD NEW ORIGIN */}
            <div className="space-y-3 mb-4">
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

            {/* LIST */}
            <ul className="space-y-2">
                {items.map((i) => (
                    <li key={i.id} className="p-3 border rounded">
                        <div className="flex justify-between items-center">
                            <span>{i.name}</span>
                            <button className="text-red-600" onClick={() => onDelete(i.id)}>
                                Delete
                            </button>
                        </div>

                        <div className="text-xs text-gray-600 mt-2">
                            <p>Endpoint: {i.api_endpoint || "—"}</p>
                            <p>Username: {i.api_username || "—"}</p>
                            <p>Password: {i.api_password ? "********" : "—"}</p>
                            <p>API Key: {i.api_key ? "********" : "—"}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
