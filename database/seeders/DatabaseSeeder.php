<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
      $this->call([
        RolesAndPermissionsSeeder::class,
      ]);
      Artisan::call('passport:install --force');
      User::create(['email' => 'admin@topapi.ru', 'password' => bcrypt('test1234567')]);
    }
}
