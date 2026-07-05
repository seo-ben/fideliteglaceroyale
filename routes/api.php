<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PointTransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| These routes are protected by Sanctum authentication for direct calls
| and HMAC signature verification for POS webhook calls.
|
*/

// Protected by Sanctum token — requires Authorization: Bearer <token>
Route::middleware(['auth:sanctum', 'throttle:60,1'])->prefix('loyalty/transactions')->group(function () {
    Route::post('/add', [PointTransactionController::class, 'add']);
    Route::post('/redeem', [PointTransactionController::class, 'redeem']);
});

// Protected by HMAC webhook signature — requires X-Webhook-Signature header
Route::middleware(['verify.webhook', 'throttle:120,1'])->prefix('loyalty/transactions')->group(function () {
    Route::post('/webhook', [PointTransactionController::class, 'webhook']);
});

