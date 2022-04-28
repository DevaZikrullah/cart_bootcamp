<?php

namespace App\Repositories;
use App\Models\Cart;
use App\Models\Item;
use Illuminate\Support\Facades\DB;

class CartRepository 
{
    protected Cart $cart;
    


    public function __construct(Cart $cart)
    {
        $this->cart = $cart;
    }


    public function getAll() : Object
    {
        $cart = $this->cart->get();
        return $cart;
    }

    public function getStok(string $name): ?int
    {
        $query = DB::collection($name)
        ->where('nama_barang', $name)
        ->value('stock');
        return $query;
    }
    
    public function addItem($cart)
    {

        $newData = new $this->cart;
        $newData->name = $cart['name'];
        $newData->price = $cart['price'];
        $newData->quantity = 1;
        $newData->save();
    }
}