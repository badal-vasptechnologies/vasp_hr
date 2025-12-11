<?php

namespace App\Services;

use GuzzleHttp\Client;

class ZoomService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client(['base_uri' => 'https://api.zoom.us/v2/']);
    }

    private function token()
    {
        $client = new Client(['base_uri' => 'https://zoom.us/oauth/']);
        $response = $client->post('token', [
            'auth' => [env('ZOOM_CLIENT_ID'), env('ZOOM_CLIENT_SECRET')],
            'form_params' => [
                'grant_type' => 'account_credentials',
                'account_id' => env('ZOOM_ACCOUNT_ID')
            ],
        ]);

        return json_decode($response->getBody(), true)['access_token'];
    }

    public function createMeeting($topic, $start)
    {
        $response = $this->client->post('users/me/meetings', [
            'headers' => [
                'Authorization' => "Bearer " . $this->token(),
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'topic' => $topic,
                'type' => 2,
                'start_time' => $start,
                'duration' => 30,
            ]
        ]);

        return json_decode($response->getBody(), true);
    }
}
