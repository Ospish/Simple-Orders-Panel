<?php

namespace App\Http\Controllers;

use App\Models\Order;
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

}
