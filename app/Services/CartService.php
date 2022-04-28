<?php

namespace App\Services;

use App\Repositories\CartRepository;
use Illuminate\Support\Facades\Validator;
use InvalidArgumentException;

class CartService
{
    protected  $cartRepository;

    public function __construct(CartRepository $cartRepository)
    {
        $this->cartRepository = $cartRepository;
    }

    public function getCartAll()
    {
        return $this->cartRepository->getAll();
    }

    public function add()
    {

        return $this->cartRepository->addItem();
    }
   
}