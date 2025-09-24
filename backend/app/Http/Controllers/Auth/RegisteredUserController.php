<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request)
    {
        // Validate input
        $request->validate([
            'full_name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Password::defaults()],
            'gender' => 'required|in:male,female,other',
            'hobbies' => 'nullable|array',
            'hobbies.*' => 'string|max:255',
            'country' => 'nullable|string|max:255',
        ]);

        // Create user
        $user = User::create([
            'full_name' => $request->full_name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password, // will auto-hash in User model
            'gender' => $request->gender,
            'hobbies' => $request->hobbies,   // array will be cast to JSON automatically
            'country' => $request->country,
        ]);

        // Optional: log in the user immediately
        Auth::login($user);

        // Return JSON response with the created user (without password)
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
        ], 201);
    }
}