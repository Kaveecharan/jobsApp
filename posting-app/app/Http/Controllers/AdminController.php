<?php

namespace App\Http\Controllers;

class AdminController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Welcome to the admin page']);
    }
}
