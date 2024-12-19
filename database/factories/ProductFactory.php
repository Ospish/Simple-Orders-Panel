<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $product_name = fake()->word();
        return [
            'name' => $product_name,
//            'description' => fake()->text(),
//            'slug' => $product_name,
            'price' => fake()->numberBetween(1,10) * 10
        ];
    }
}
