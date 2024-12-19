<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        #Product::factory(10)->create();
        Order::factory(10)->has(OrderItem::factory(rand(1,3)))->create(['status' => rand(1,3)]);
    }
}
