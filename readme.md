# ORI3: WhatStudy #

This is the third project I created during my first year of HBO-ICT on Windesheim Flevoland.

The goal of this project is to create a chat system for first-year students. This is done by:
- using an authentication system from our school (EPIC) to log in.
- creating a web frontend to send and receive messages in several rooms.
- storing messages and users in an SQL databse.
- creating an API to communicate between the database and the frontend.

This project was made possible using regular HTML/CSS/JS and:
- [Laravel, a PHP framework](https://laravel.com/)
- [Vue.js, a JS framework](https://vuejs.org/)
- [ChartJS, a JS library to display graphs](https://www.chartjs.org/)

The frontend features of Laravel (Mix and Blade) are unused in this project. All frontend-related files are availible in the `public` folder.

## How to run locally (if needed)
### What's needed (with several ways to install it):
- a MySQL or MariaDB server
  - Universal: [XAMPP](https://www.apachefriends.org/index.html) (recommended) or Docker
  - Windows: [Laragon](https://laragon.org/) or [directly](https://downloads.mariadb.org/)
  - macOS: [Homebrew](https://brew.sh) [(Guide)](https://mariadb.com/kb/en/library/installing-mariadb-on-macos-using-homebrew/)
  - Linux: using your favourite package manager
- PHP 7.1+
  - Universal: [XAMPP](https://www.apachefriends.org/index.html) (recommended)
  - Windows: [Laragon](https://laragon.org/) or [directly](https://windows.php.net/)
  - macOS: Included with macOS Mojave, newer versions can be installed using [Homebrew](https://brew.sh)
  - Linux: `sudo pacaptdnfnixsnapman`
- Composer
  - Universal: [Guide](https://getcomposer.org/doc/00-intro.md) (recommended)
  - Windows: Also included in [Laragon](https://laragon.org/)

### Steps
1. Open a Terminal window.
2. Clone or download this Git repository.
3. When inside the folder, run `composer install` to install Laravel dependencies.
4. Copy .env.example to .env and set up the database settings (the default settings work fine if you're using XAMPP).
5. Run `php artisan migrate`.
    - If you need sample data, it's included in `database/testdata`.
6. Run a test server by running `php artisan serve`.
    - Press Ctrl+C in the terminal window to stop the server.