<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
  public function register(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email' => 'required|email',
      'password' => 'required',
      'password_confirmation' => 'required|same:password',
    ]);
    if($validator->fails()){
      return $validator->errors();
    }
    $input = $request->all();
    $input['password'] = bcrypt($input['password']);
    $user = User::create($input);
    $success['token'] =  $user->createToken('TopApi')->accessToken;
    return response()->json($success);
  }

  public function login(Request $request)
  {
    if(Auth::attempt($request->only('email', 'password'))){
      $user = Auth::user();
      $success['token'] =  $user->createToken('TopApi')-> accessToken;
      $success['user'] = new UserResource($user);
      return response()->json($success);
    } else {
      return response()->json(['error' => 'Unauthorised'], 403);
    }
  }

  public function details()
  {
    $user = User::find(Auth::id());
    return response()->json(new UserResource($user));
  }

}
