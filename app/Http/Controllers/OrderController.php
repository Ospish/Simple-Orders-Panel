<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    function get(Request $request)
    {
        $content = json_decode($request->getContent());
        $content = '';
        $orders = Order::all('id','created_at','user_id','status');
        foreach ($orders as $order) {
            $the_order = Order::find($order->id);
            $order['order_items'] = $the_order->getOrderItems();
            $order['user_name'] = $the_order->getUsername();
            $order['status_text'] = config('constants.status')[$order->status];
        }
        return response()->json($orders);
    }

    function add(Request $request)
    {
        $content = json_decode($request->getContent());
        Order::factory(1)->has(OrderItem::factory(rand(1,3)))->create(['status' => rand(1,3)]);
        //$order = Order::create(['name' => $content->name, 'price' => $content->price]);
        return response()->json();
    }
}
