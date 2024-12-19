<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/orders', [OrderController::class, 'get'])->name('orders.get');
    Route::post('/orders/add', [OrderController::class, 'add'])->name('orders.add');
    Route::post('/orders/remove', [OrderController::class, 'remove'])->name('orders.remove');
    Route::get('/products', [ProductController::class, 'get'])->middleware(['auth'])->name('products.get');
    Route::post('/products/add', [ProductController::class, 'add'])->name('products.add');
    Route::post('/products/remove', [ProductController::class, 'remove'])->name('products.remove');
});

require __DIR__.'/auth.php';
