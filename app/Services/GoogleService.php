<?php
namespace App\Services;

use Google\Client;
use Google\Service\Calendar;
use Google\Service\Calendar\Event;

class GoogleService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client();
        $this->client->setAuthConfig(storage_path('app/google_credentials.json'));
        $this->client->addScope(Calendar::CALENDAR);

        // Load saved token
        if (file_exists(storage_path('app/google_token.json'))) {
            $token = json_decode(file_get_contents(storage_path('app/google_token.json')), true);
            if (!empty($token) && isset($token['access_token'])) {
                $this->client->setAccessToken($token);
            } else {
                throw new \Exception('Invalid token format in google_token.json');
            }
        } else {
            throw new \Exception('Google token not found. Authenticate first!');
        }
    }

    public function createMeet($summary, $start)
    {
        $service = new Calendar($this->client);

        $startTime = new \DateTime($start, new \DateTimeZone('Asia/Kolkata'));
        $endTime = (clone $startTime)->modify('+30 minutes');

        $event = new Event([
            'summary' => $summary,
            'start' => [
                'dateTime' => $startTime->format(\DateTime::RFC3339),
                'timeZone' => 'Asia/Kolkata',
            ],
            'end' => [
                'dateTime' => $endTime->format(\DateTime::RFC3339),
                'timeZone' => 'Asia/Kolkata',
            ],
            'conferenceData' => [
                'createRequest' => [
                    'requestId' => uniqid(),
                    'conferenceSolutionKey' => ['type' => 'hangoutsMeet'],
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
