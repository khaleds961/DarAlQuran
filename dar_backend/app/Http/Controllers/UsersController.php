<?php

namespace App\Http\Controllers;

use App\Models\Students_Centers_Teachers;
use App\Models\Teachers;
use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;



class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getUserbyToken(Request $request)
    {
        //get user_id from token 
        $token = PersonalAccessToken::findToken($request->bearerToken());
        $user = $token->tokenable;

        $center_id = Students_Centers_Teachers::select('center_id')->where('teacher_id', $user->id)->get();
        if ($center_id) {
            $user->centers = $center_id;
        }
        return response([
            'user' => $user,
            'success' => true
        ]);
    }

    public function register(Request $request)
    {
        $validate = $request->validate(
            [
                'first_name'   => 'required|string',
                'middle_name'  => 'required|string',
                'last_name'    => 'required|string',
                // 'username'     => 'required|unique:users,username',
                // 'password'     => 'required',
                'role_id'      => 'required|integer',
                'phone_number' => 'required'
            ],
            [
                'first_name.required'   => __('message.first_name_required'),
                'first_name.string'     => __('message.first_name_string'),
                'middle_name.required'  => __('message.middle_name_required'),
                'middle_name.string'    => __('message.middle_name_string'),
                'last_name.required'    => __('message.last_name_required'),
                'last_name.string'      => __('message.last_name_string'),
                'username.required'     => __('message.username_required'),
                'username.unique'       => __('message.username_unique'),
                'password.required'     => __('message.password_required'),
                'role_id.required'      => __('message.role_id_required'),
                'role_id.integer'       => __('message.role_id_integer'),
                'phone_number.required' => __('message.phone_number_required'),
            ]
        );
        if ($request['username'] && $request['password']) {
            $user = Users::create([
                'username'  => $request['username'],
                'password' => bcrypt($request['password']),
                'role_id' => $validate['role_id']
            ]);
        } else {
            $user = [
                'id' => null
            ];
        }

        if ($user) {
            $teacher = Teachers::create([
                'user_id' => $user['id'],
                'first_name' => $validate['first_name'],
                'middle_name' => $validate['middle_name'],
                'last_name'   => $validate['last_name'],
                'phone_number' => $validate['phone_number']
            ]);
            Students_Centers_Teachers::create([
                'teacher_id' => $teacher->id,
                'center_id' => $request['center_id']
            ]);
        }

        return response([
            'message' => __('message.user_added'),
            'success' => true
        ]);
    }

    public function login(Request $request)
    {
        try {
            $validate = $request->validate(
                [
                    'username' => 'required',
                    'password' => 'required'
                ],
                [
                    'username.required' => __('message.username_required'),
                    'password.required' => __('message.password_required'),
                ]
            );

            $user = Users::with('centers')->where('username', $validate['username'])->first();

            if (!$user || !Hash::check($validate['password'], $user->password)) {
                return response([
                    'message' => __('message.bad_creds'),
                    'success' => true
                ], 401);
            }

            $token = $user->createToken('myToken')->plainTextToken;
            $data = [
                'user'  => $user,
                'token' => $token
            ];
            return response([
                'data' => $data,
                'success' => true
            ]);
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response([
            'message' => 'logout',
            'success' => true
        ]);
    }

    // public function omarsfunction(){
    //   return  Users::with('centers')->get();
    // }
}
