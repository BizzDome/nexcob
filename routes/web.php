<?php

use App\Http\Controllers\Admin\UserController;
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
        Route::put('/admin/users/{role}', 'update')->name('users.update');
        Route::delete('/admin/users/{role}', 'destroy')->name('users.destroy');
    });
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
