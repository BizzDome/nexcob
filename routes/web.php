<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\RoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    // ============================================
    // Users
    // ============================================
    Route::controller(UserController::class)->group(function (){
        Route::get('/admin/users', 'index')->name('users.index');
        Route::post('/admin/users', 'store')->name('users.store');
        Route::put('/admin/users/{user}', 'update')->name('users.update');
        Route::delete('/admin/users/{user}', 'destroy')->name('users.destroy');
    });
    // ============================================
    // Roles
    // ============================================
    Route::controller(RoleController::class)->group(function (){
        Route::get('/admin/roles', 'index')->name('roles.index');
        Route::post('/admin/roles', 'store')->name('roles.store');
        Route::put('/admin/roles/{role}', 'update')->name('roles.update');
        Route::delete('/admin/roles/{role}', 'destroy')->name('roles.destroy');
    });
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
