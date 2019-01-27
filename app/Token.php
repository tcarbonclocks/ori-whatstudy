<?php

namespace App;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class Token
{
    public static function check($token)
    {
        $url = 'https://epic.clow.nl/token/check/'.$token;
        $client = new Client(['http_errors' => false]);
        $response = $client->request('GET', $url);

        return ($response->getStatusCode()==200);
    }

}