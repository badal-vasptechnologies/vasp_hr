<?php

namespace App\Http\Controllers;

use App\Models\Origin;
use App\Models\Department;
use App\Models\Location;
use App\Models\Workmode;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Settings/Index', [
            'origins' => Origin::all(),
            'departments' => Department::all(),
            'locations' => Location::all(),
            'workModes' => Workmode::all(),
            'settings' => Setting::all(),
            'success' => session('success'),
            'errors' => session('errors'),
        ]);
    }

    /* -------------------------
        ORIGINS
    --------------------------*/
    public function storeOrigin(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'api_endpoint' => 'nullable|url|max:500',
            'api_username' => 'nullable|string|max:255',
            'api_password' => 'nullable|string|max:255',
            'api_key' => 'nullable|string|max:255',
        ]);

        Origin::create($validated);

        return back()->with('success', 'Origin added successfully.');
    }

    public function updateOrigin(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'api_endpoint' => 'nullable|url|max:500',
            'api_username' => 'nullable|string|max:255',
            'api_password' => 'nullable|string|max:255',
            'api_key' => 'nullable|string|max:255',
        ]);

        Origin::findOrFail($id)->update($validated);

        return back()->with('success', 'Origin updated successfully.');
    }

    public function deleteOrigin($id)
    {
        Origin::findOrFail($id)->delete();
        return back()->with('success', 'Origin deleted.');
    }

    /* -------------------------
        DEPARTMENTS
    --------------------------*/
    public function storeDepartment(Request $request)
    {
        $validated = $request->validate(['name' => 'required|string|max:255']);
        Department::create($validated);
        return back()->with('success', 'Department added.');
    }

    public function deleteDepartment($id)
    {
        Department::findOrFail($id)->delete();
        return back()->with('success', 'Department deleted.');
    }

    /* -------------------------
        LOCATIONS
    --------------------------*/
    public function storeLocation(Request $request)
    {
        $validated = $request->validate(['name' => 'required|string|max:255']);
        Location::create($validated);
        return back()->with('success', 'Location added.');
    }

    public function deleteLocation($id)
    {
        Location::findOrFail($id)->delete();
        return back()->with('success', 'Location deleted.');
    }

    /* -------------------------
        WORK MODES
    --------------------------*/
    public function storeWorkmode(Request $request)
    {
        $validated = $request->validate(['name' => 'required|string|max:255']);
        Workmode::create($validated);
        return back()->with('success', 'Work mode added.');
    }

    public function deleteWorkmode($id)
    {
        Workmode::findOrFail($id)->delete();
        return back()->with('success', 'Work mode deleted.');
    }

    // SETTINGS CRUD
    public function storeConfig(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'value' => 'required|string|max:500',
        ]);

        Setting::create([
            'name' => $validated['name'],
            'value' => $validated['value'],
            'status' => 1,
        ]);

        return back()->with('success', 'Setting added.');
    }

    public function updateConfig(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'value' => 'required|string|max:500',
        ]);

        Setting::findOrFail($id)->update($validated);

        return back()->with('success', 'Setting updated.');
    }

    public function deleteConfig($id)
    {
        Setting::findOrFail($id)->delete();
        return back()->with('success', 'Setting deleted.');
    }

    public function toggleStatus($id)
    {
        $setting = Setting::findOrFail($id);
        $setting->status = $setting->status ? 0 : 1;
        $setting->save();

        return back()->with('success', 'Status updated.');
    }

}
