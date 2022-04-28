<?php

namespace App\Repositories;
use App\Models\Cart;
use App\Models\Item;
use Illuminate\Support\Facades\DB;

class CartRepository 
{
    protected $cart;
    


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
    
    public function addItem()
    {

        Cart::add([array(
            '_id' => $this->_id, 
            'name' => $this->name,
            'desc' =>$this->desc,
            'quantity' => $this->quantity,
            'price' => $this->price
        )]);
    }
}