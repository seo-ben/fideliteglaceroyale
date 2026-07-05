<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => false,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/c/{qr_token}', [\App\Http\Controllers\PublicClientController::class, 'show'])
    ->middleware('throttle:30,1')
    ->name('client.portal');

Route::post('/client/login', [\App\Http\Controllers\PublicClientController::class, 'login'])
    ->middleware('throttle:10,1')
    ->name('client.login');

Route::get('/dashboard', \App\Http\Controllers\Admin\DashboardController::class)
    ->middleware(['auth', 'admin'])
    ->name('dashboard');

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('admin.settings');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('admin.settings.update');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::resource('clients', \App\Http\Controllers\Admin\ClientController::class)->names('admin.clients');
    Route::resource('levels', \App\Http\Controllers\Admin\LevelController::class)->names('admin.levels');
    Route::resource('point-rules', \App\Http\Controllers\Admin\PointRuleController::class)->names('admin.point-rules');
    Route::get('/cards/generator', [\App\Http\Controllers\Admin\CardGeneratorController::class, 'index'])->name('admin.cards.generator');
    Route::post('/cards/generate', [\App\Http\Controllers\Admin\CardGeneratorController::class, 'generate'])->name('admin.cards.generate');
    Route::get('/cards/print', [\App\Http\Controllers\Admin\CardGeneratorController::class, 'printView'])->name('admin.cards.print');
    
    // Secure route to run migrations via web interface (useful for FTP deployments)
    Route::get('/deploy/migrate', function () {
        try {
            \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
            return response('Les migrations ont été exécutées avec succès !<br><pre>' . \Illuminate\Support\Facades\Artisan::output() . '</pre>');
        } catch (\Exception $e) {
            return response('Erreur lors des migrations : ' . $e->getMessage(), 500);
        }
    })->name('admin.deploy.migrate');
});

require __DIR__.'/auth.php';

