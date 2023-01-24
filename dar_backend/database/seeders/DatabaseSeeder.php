<?php

namespace Database\Seeders;

use App\Models\Roles;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->delete();
        $roles = [
            ['id' => 1, 'title' => 'superadmin'],
            ['id' => 2, 'title' => 'manager'],
            ['id' => 3, 'title' => 'supervisor'],
            ['id' => 4, 'title' => 'teacher'],
            ['id' => 5, 'title' => 'student'],
        ];
        Roles::insert($roles);
    }
}
