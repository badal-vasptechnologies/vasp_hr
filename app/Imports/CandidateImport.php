<?php

namespace App\Imports;

use App\Models\Candidate;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CandidateImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        // Convert Excel date or string date into Y-m-d format
        $formattedDate = null;

        if (!empty($row['date_of_apply'])) {

            try {
                // Excel date number → convert
                if (is_numeric($row['date_of_apply'])) {
                    $formattedDate = Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row['date_of_apply']))->format('Y-m-d');
                } else {
                    // String date → parse & format
                    $formattedDate = Carbon::parse($row['date_of_apply'])->format('Y-m-d');
                }
            } catch (\Exception $e) {
                // Set null or handle error
                $formattedDate = null;
            }
        }

        return new Candidate([
            'name'          => $row['name'],
            'email'         => $row['email'],
            'mobile'        => $row['mobile'],
            'address'       => $row['address'] ?? null,
            'status'        => $row['status'] ?? 'Pending',
            'date_of_apply' => $formattedDate,
            'origin_id'     => $row['origin_id'] ?? 1,
        ]);
    }
}
