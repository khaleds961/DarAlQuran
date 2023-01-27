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

        DB::table('users')->insert([
            'first_name' => 'admin',
            'middle_name' => 'admin',
            'last_name' => 'admin',
            'username' => 'admin',
            'password' => bcrypt('123123'),
            'role_id'  => 1,
            'phone_number'  => 710
        ]);

        DB::table('users')->insert([
            'first_name' => 'manager',
            'middle_name' => 'manager',
            'last_name' => 'manager',
            'username' => 'manager',
            'password' => bcrypt('123123'),
            'role_id'  => 2,
            'phone_number'  => 711
        ]);
    }
}
