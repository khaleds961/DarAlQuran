<?php

namespace App\Http\Controllers;

use App\Models\Centers;
use App\Models\Students_Centers_Teachers;
use App\Models\Users;
use Exception;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Auth;



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

        $center_id = Students_Centers_Teachers::select('center_id')->where('user_id', $user->id)->get();
        // return $center_id;
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
                'role_id' => $validate['role_id'],
                'first_name' => $validate['first_name'],
                'middle_name' => $validate['middle_name'],
                'last_name'   => $validate['last_name'],
                'phone_number' => $validate['phone_number']
            ]);
        } else {
            $user = Users::create([
                'username'  => null,
                'password' => null,
                'role_id' => $validate['role_id'],
                'first_name' => $validate['first_name'],
                'middle_name' => $validate['middle_name'],
                'last_name'   => $validate['last_name'],
                'phone_number' => $validate['phone_number']
            ]);
        }
        if ($user) {
            Students_Centers_Teachers::create([
                'user_id' => $user['id'],
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

    public function getAllUsers($user_id)
    {
        try {
            $teachers = Users::where('is_deleted', 0)
                ->where('id', '!=', $user_id)
                ->where('is_deleted', 0)
                ->paginate(10);

            return response(
                [
                    'data' => $teachers,
                    'success' => true
                ]
            );
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function getTeacherbySupervisor($center_id, $user_id)
    {
        $teacher_ids = Students_Centers_Teachers::select('user_id')
            ->where('center_id', $center_id)
            ->where('user_id', '!=', $user_id)
            ->where('is_deleted', 0)
            ->get();

        $teacher = [];

        //get teacher details
        foreach ($teacher_ids as $teacher_id) {
            $teacher[] = Users::find($teacher_id)->first();
        }
        return response([
            'data' => $teacher,
            'success' => true
        ]);
    }

    //without pagination
    public function getAllTeachersByCenter($center_id)
    {
        try {
            $center = Centers::find($center_id);
            $teachers = $center->teachers()->get();
            return response([
                'data' => $teachers,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    //getting teachers by admin or supervisor with pagination
    public function getTeachersByCenter($center_id)
    {
        if ($center_id != 0) {
            $center = Centers::find($center_id);
            $teachers = $center->teachers()->paginate(10);
        } else {
            $teachers = Users::where('is_deleted', 0)->where('role_id', 4)->paginate(10);
        }

        return response([
            'data' => $teachers,
            'success' => true
        ]);
    }
}
