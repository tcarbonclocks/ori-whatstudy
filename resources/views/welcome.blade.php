<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel</title>

        <!-- Fonts -->
        <!-- <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet" type="text/css"> -->
        <link rel="stylesheet" href="css/app.css">


        <!-- Styles -->
        <style>
            .navbar-laravel {
                background-color: #fff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
            }

            body {
                padding-bottom: 65px;
                padding-top: 65px;
                background-color: #ccc;
                margin: auto;
                max-width: 600px;
                }

            .sticky-offset {
                top: 56px;
            }

            .fixed-bottom-600px {
                margin: auto;
                max-width: 600px;
            }
        </style>
    </head>
    <body>
        <div id="app">
            <app></app>
        </div>
        <script type="text/javascript" src="js/app.js"></script>
    </body>
</html>
