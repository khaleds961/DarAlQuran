<?php

namespace App\Http\Controllers;

use App\Models\Centers;
use App\Models\Students;
use App\Models\Students_Centers_Teachers;
use App\Models\Users;
use Exception;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Auth;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

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

    //check if this teacher belong to this center
    public function checkteacher($center_id, $user_id)
    {
        $check_teacher = Students_Centers_Teachers::where('center_id', $center_id)
            ->where('user_id', $user_id)->get();
        // return $check_teacher;
        if (count($check_teacher) > 0) {
            $teacher = Users::join('students_centers_teachers', 'students_centers_teachers.user_id', '=', 'users.id')
                ->where('user_id', $user_id)
                ->select('users.*', 'students_centers_teachers.center_id as center_id')
                ->first();
            return response([
                'data' => $teacher,
                'success' => true
            ]);
        } else {
            return response([
                'data' => [],
                'success' => false,
                'message' => __('message.teacher_unauthorized')
            ]);
        }
    }

    public function getteacherbyid(Request $request, $user_id)
    {
        try {
            $teacher = Users::join('students_centers_teachers', 'students_centers_teachers.user_id', '=', 'users.id')
                ->where('user_id', $user_id)
                ->select('users.*', 'students_centers_teachers.center_id as center_id')
                ->first();
            return response([
                'data' => $teacher,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function update(Request $request, $user_id)
    {
        $teacher = Users::find($user_id);
        if ($teacher) {
            $teacher->first_name = $request->first_name;
            $teacher->middle_name = $request->middle_name;
            $teacher->last_name = $request->last_name;
            $teacher->username = $request->username;
            $teacher->phone_number = $request->phone_number;
            if ($request->password) {
                if (!Hash::check($request['password'], $teacher->password)) {
                    $teacher->password = bcrypt($request->password);
                }
            }
            $teacher->save();
            $check_update = count($teacher->getChanges());
            if ($check_update > 0) {
                return response([
                    'message' => __('message.teacher_updated'),
                    'success' => true
                ]);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $check_teacher = Students_Centers_Teachers::where('user_id', $id)
                ->whereNotNull('student_id')
                ->select('student_id')->get();
            if (count($check_teacher) > 0) {
                return response([
                    'message' => __('message.cant_delete'),
                    'success' => false
                ]);
            } else {
                $teacher = Users::find($id);
                if ($teacher) {
                    $teacher->delete();
                }
                return response([
                    'message' => __('message.teacher_deleted'),
                    'success' => true
                ]);
            }
        } catch (Exception $e) {
            return response($e->getMessage());
        }
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

    //get all teachers no pagination
    public function allteachers()
    {
        try {
            $teachers = Users::where('is_deleted', 0)
                ->where('role_id', 4)
                ->select(
                    DB::raw('CONCAT (first_name," ",middle_name," ",last_name) as teacher_name'),
                    'id'
                )->get();
            return response([
                'data' => $teachers,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }
    //without pagination
    public function getAllTeachersByCenter($center_id)
    {
        try {
            if ($center_id != 0) {
                $center = Centers::find($center_id);
                $teachers = $center->teachers()->get();
            }
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
            $data = Users::join('students_centers_teachers', 'students_centers_teachers.user_id', '=', 'users.id')
                ->join('centers', 'centers.id', '=', 'students_centers_teachers.center_id')
                ->select(
                    'users.id',
                    'users.first_name',
                    'users.middle_name',
                    'users.last_name',
                    'users.phone_number',
                    'users.role_id',
                    'centers.id as center_id',
                    'centers.name as center_name'
                )
                ->where('center_id', $center_id)
                ->where('role_id', 4)
                ->groupBy('id')
                ->orderBy('id','desc')
                ->paginate(10);
        } else {
            $data = Users::join('students_centers_teachers', 'students_centers_teachers.user_id', '=', 'users.id')
                ->join('centers', 'centers.id', '=', 'students_centers_teachers.center_id')
                ->select(
                    'users.id',
                    'users.first_name',
                    'users.middle_name',
                    'users.last_name',
                    'users.phone_number',
                    'users.role_id',
                    'centers.id as center_id',
                    'centers.name as center_name'
                )
                ->where('role_id', 4)
                ->groupBy('id')
                ->orderBy('id','desc')
                ->paginate(10);
        }
        return response([
            'data' => $data,
            'success' => true
        ]);
    }

    public function counting()
    {
        try {
            $centers = Centers::where('is_deleted', 0)->count();
            $students = Students::where('is_deleted', 0)->count();
            $teachers = Users::where('is_deleted', 0)->where('role_id', 4)->count();
            $count = [
                'centers' => $centers,
                'students' => $students,
                'teachers' => $teachers
            ];
            return response([
                'data' => $count,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e);
        }
    }
}
