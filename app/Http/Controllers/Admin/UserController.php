<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::query()
            ->with([
                'roles:id,name'
            ])
            ->when($request->search, function ($query, $search) {
                $query->whereAny(['name', 'email'], 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate($request->per_page ?? 5)
            ->through(function ($user) {
                $user->roles->each(function ($role) {
                    $role->makeHidden('pivot');
                });
                return $user;
            });

        return Inertia::render('admin/users/Index', [
            'users' => $users,
            'roles' => Role::all()
        ]);
    }

    public function store(UserRequest $request)
    {
        if (isset($request->password)) {
            $request->merge(['password' => Hash::make($request->password)]);
        }
        
        $user = User::create($this->userStore($request));

        if (isset($request->roles)) {
            $user->syncRoles($request->roles);
        }

        return redirect()->route('users.index');
    }

    public function update(UserRequest $request, User $user)
    {
        if (isset($request->password) && $request->password) {
            $request->merge(['password' => Hash::make($request->password)]);
        } else {
            unset($request['password']);
        }

        $user->update($this->userStore($request));

        if (isset($request->roles)) {
            $user->syncRoles($request->roles);
        }

        return redirect()->route('users.index');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index');
    }

    protected function userStore(Request $request): array
    {
        return $request->only([
            // 'campaign_id', 
            'name', 
            'email', 
            'password'
        ]);
    }
}
