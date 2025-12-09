<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response; 

use Maatwebsite\Excel\Facades\Excel;
use App\Imports\CandidateImport;
use Illuminate\Support\Facades\Log;

class ExternalDataUploadController extends Controller
{
    public function importPage()
    {
        return Inertia::render('ExternalDataUpload/Import');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:2048',
        ]);

        try {
            Excel::import(new CandidateImport, $request->file('file'));

            return redirect()->back()->with('success', 'Candidates imported successfully!');
        } catch (\Exception $e) {
            Log::error($e);

            return redirect()->back()->with('error', 'Something went wrong during import.');
        }
    }
    public function importFromApi()
    {
        $response = Http::get('https://example.com/api/candidates');

        foreach ($response->json() as $item) {
            Candidate::create([
                'name'          => $item['name'],
                'email'         => $item['email'],
                'mobile'        => $item['mobile'],
                'address'       => $item['address'] ?? null,
                'status'        => $item['status'],
                'date_of_apply' => $item['date_of_apply'],
                'origin_id'     => $item['origin_id'],
            ]);
        }

        return back()->with('success', 'API Candidates imported successfully!');
    }

}
