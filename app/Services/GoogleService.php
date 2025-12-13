<?php

namespace App\Services;

use Google\Client;
use Google\Service\Calendar;

class GoogleService
{
    public function createMeet($summary, $start)
    {
        $client = new Client();
        $client->setAuthConfig(storage_path('app/google_credentials.json'));
        $client->addScope(Calendar::CALENDAR);

        $service = new Calendar($client);

        $event = new Calendar\Event([
            'summary' => $summary,
            'start' => ['dateTime' => $start],
            'end' => ['dateTime' => date('c', strtotime($start . '+30 minutes'))],
            'conferenceData' => [
                'createRequest' => [
                    'requestId' => uniqid(),
                ],
            ],
        ]);

        $event = $service->events->insert('primary', $event, ['conferenceDataVersion' => 1]);

        return [
            'meeting_id' => $event->id,
            'join_url'   => $event->hangoutLink,
        ];
    }
}