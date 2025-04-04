<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'view:users',
            'create:users',
            'edit:users',
            'delete:users',
            'view:roles',
            'create:roles',
            'edit:roles',
            'delete:roles',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo(Permission::all());

        $role = Role::create(['name' => 'user']);
        $role->givePermissionTo([
            'view:users',
            'create:users',
            'edit:users',
            'view:roles',
            'create:roles',
            'edit:roles',
        ]);

        $role = Role::create(['name' => 'executive']);
        $role->givePermissionTo([
            'view:users',
            'view:roles',
        ]);

        $admin = \App\Models\User::where('email', 'dliza@worldcob.com')->first();
        if ($admin) {
            $admin->assignRole('admin');
        }
    }
}
