<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    function get(Request $request)
    {
        $content = json_decode($request->getContent());
        $orders = Product::orderBy("id", "DESC")->get();
        return response()->json($orders);
    }

    function add(Request $request)
    {
        $content = json_decode($request->getContent());
        $product = Product::create(['name' => $content->name, 'price' => $content->price]);
        return response()->json($product);
    }

    function remove(Request $request)
    {
        $content = json_decode($request->getContent());
        $result = Product::where('id', $content->id)->delete();
        return response()->json($result);
    }
}
