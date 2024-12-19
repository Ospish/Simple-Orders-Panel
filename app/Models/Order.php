<?php

namespace App\Models;

use Database\Factories\OrderFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    /** @use HasFactory<OrderFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class)
                    ->withPivot('quantity')
                    ->withTimestamps();
    }


    // Метод для получения общей стоимости заказа
    public function totalCost()
    {
        return $this->orderItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });
    }

    public function statusText()
    {
        return config('constants.status')[$this->status];
    }

    public function getOrderItems()
    {
        return $this->orderItems()->get();
    }

    public function getUsername()
    {
        return $this->user()->get()[0]->name;
    }

    public function getItemCount()
    {
        return $this->orderItems()->sum('quantity');
    }
}
