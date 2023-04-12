<?php

namespace App\Http\Controllers;

use App\Models\Rings;
use App\Models\Students;
use App\Models\Students_Centers_Teachers;
use Exception;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class RingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($center_id)
    {
        try {
            if ($center_id == 0) {
                $rings = Rings::join('users', 'users.id', '=', 'rings.teacher_id')
                    ->join('centers', 'centers.id', '=', 'rings.center_id')
                    ->select(
                        'rings.id',
                        'rings.name',
                        'rings.is_active',
                        'rings.created_at',
                        'users.id as teacher_id',
                        'users.first_name as teacher_fn',
                        'users.middle_name as teacher_mn',
                        'users.last_name as teacher_ln',
                        'centers.id as center_id',
                        'centers.name as center_name'
                    )
                    ->paginate(10);
            } else {
                $rings = Rings::join('users', 'users.id', '=', 'rings.teacher_id')
                    ->join('centers', 'centers.id', '=', 'rings.center_id')
                    ->where('center_id', $center_id)
                    ->select(
                        'rings.id',
                        'rings.name',
                        'rings.is_active',
                        'rings.created_at',
                        'users.id as teacher_id',
                        'users.first_name as teacher_fn',
                        'users.middle_name as teacher_mn',
                        'users.last_name as teacher_ln',
                        'centers.id as center_id',
                        'centers.name as center_name'
                    )
                    ->paginate(10);
            }
            return response([
                'data' => $rings,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    //no pagination
    public function getringsbycenter($center_id)
    {
        try {
            $rings = Rings::where('center_id', $center_id)
                ->where('is_active', 1)
                ->get();
            return response([
                'data' => $rings,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    // pagination
    public function getringsbycenterpagination($center_id)
    {
        try {
            $rings = Rings::join('users', 'users.id', '=', 'rings.teacher_id')
                ->join('centers', 'centers.id', '=', 'rings.center_id')
                ->where('center_id', $center_id)
                ->select(
                    'rings.*',
                    'users.first_name as teacher_fn',
                    'users.middle_name as teacher_mn',
                    'users.last_name as teacher_ln',
                    'centers.name as center_name',
                    'centers.id as center_id'
                )
                ->paginate(10);
            return response([
                'data' => $rings,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    // pagination
    public function filterRings(Request $request, $center_id, $teacher_id, $filter_ring)
    {
        try {
            //get user_id from token 
            $token = PersonalAccessToken::findToken($request->bearerToken());
            $user = $token->tokenable;
            if ($user) {
                $role_id = $user->role_id;
                if ($role_id == 1 || $role_id == 2) {
                    if ($filter_ring == 'all') {
                        $query = Rings::join('users', 'users.id', '=', 'rings.teacher_id')
                            ->join('centers', 'centers.id', '=', 'rings.center_id')
                            ->select(
                                'rings.*',
                                'users.first_name as teacher_fn',
                                'users.middle_name as teacher_mn',
                                'users.last_name as teacher_ln',
                                'centers.name as center_name'
                            );
                        if ($center_id != 0) {
                            $query->where('center_id', $center_id);
                        }
                        if ($teacher_id != 0) {
                            $query->where('teacher_id', $teacher_id);
                        }
                        $rings = $query->paginate(10);
                    } else {
                        if ($center_id == 0 && $teacher_id == 0) {
                            $rings = Rings::join('users', 'users.id', '=', 'rings.teacher_id')
                                ->join('centers', 'centers.id', '=', 'rings.center_id')
                                ->where('is_active', $filter_ring)
                                ->select(
                                    'rings.*',
                                    'users.first_name as teacher_fn',
                                    'users.middle_name as teacher_mn',
                                    'users.last_name as teacher_ln',
                                    'centers.name as center_name'
                                )
                                ->paginate(10);
                        } elseif ($center_id != 0 && $teacher_id == 0) {
                            $rings = Rings::join('users', 'users.id', '=', 'rings.teacher_id')
                                ->join('centers', 'centers.id', '=', 'rings.center_id')
                                ->where('center_id', $center_id)
                                ->where('is_active', $filter_ring)
                                ->select(
                                    'rings.*',
                                    'users.first_name as teacher_fn',
                                    'users.middle_name as teacher_mn',
                                    'users.last_name as teacher_ln',
                                    'centers.name as center_name'
                                )
                                ->paginate(10);
                        } else {
                            $rings = Rings::join('users', 'users.id', '=', 'rings.teacher_id')
                                ->join('centers', 'centers.id', '=', 'rings.center_id')
                                ->where('center_id', $center_id)
                                ->where('teacher_id', $teacher_id)
                                ->where('is_active', $filter_ring)
                                ->select(
                                    'rings.*',
                                    'users.first_name as teacher_fn',
                                    'users.middle_name as teacher_mn',
                                    'users.last_name as teacher_ln',
                                    'centers.name as center_name'
                                )
                                ->paginate(10);
                        }
                    }
                } elseif ($role_id === 3) {
                    $id_center = Students_Centers_Teachers::where('user_id', $user->id)
                        ->first()->center_id;
                    if ($filter_ring == 'all') {
                        $query = Rings::join('users', 'users.id', '=', 'rings.teacher_id')
                            ->join('centers', 'centers.id', '=', 'rings.center_id')
                            ->select(
                                'rings.*',
                                'users.first_name as teacher_fn',
                                'users.middle_name as teacher_mn',
                                'users.last_name as teacher_ln',
                                'centers.name as center_name'
                            )
                            ->where('center_id', $id_center);
                        if ($teacher_id != 0) {
                            $query->where('teacher_id', $teacher_id);
                        }
                        $rings = $query->paginate(10);
                    } else {
                        $query = Rings::join('users', 'users.id', '=', 'rings.teacher_id')
                            ->join('centers', 'centers.id', '=', 'rings.center_id')
                            ->select(
                                'rings.*',
                                'users.first_name as teacher_fn',
                                'users.middle_name as teacher_mn',
                                'users.last_name as teacher_ln',
                                'centers.name as center_name'
                            )
                            ->where('center_id', $id_center)
                            ->where('is_active', $filter_ring);
                        if ($teacher_id != 0) {
                            $query->where('teacher_id', $teacher_id);
                        }
                        $rings = $query->paginate(10);
                    }
                } else {
                    $id_center = Students_Centers_Teachers::where('user_id', $user->id)
                        ->first()->center_id;
                    if ($filter_ring == 'all') {
                        $query = Rings::join('users', 'users.id', '=', 'rings.teacher_id')
                            ->join('centers', 'centers.id', '=', 'rings.center_id')
                            ->select(
                                'rings.*',
                                'users.first_name as teacher_fn',
                                'users.middle_name as teacher_mn',
                                'users.last_name as teacher_ln',
                                'centers.name as center_name'
                            )
                            ->where('center_id', $id_center)
                            ->where('teacher_id', $user->id);

                        $rings = $query->paginate(10);
                    } else {
                        $query = Rings::join('users', 'users.id', '=', 'rings.teacher_id')
                            ->join('centers', 'centers.id', '=', 'rings.center_id')
                            ->select(
                                'rings.*',
                                'users.first_name as teacher_fn',
                                'users.middle_name as teacher_mn',
                                'users.last_name as teacher_ln',
                                'centers.name as center_name'
                            )
                            ->where('center_id', $id_center)
                            ->where('is_active', $filter_ring)
                            ->where('teacher_id', $user->id);
                        $rings = $query->paginate(10);
                    }
                }
            }
            return response([
                'data' => $rings,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function getringsbyteacher($teacher_id)
    {
        try {
            $rings = Rings::join('users', 'users.id', '=', 'rings.teacher_id')
                ->join('centers', 'centers.id', '=', 'rings.center_id')
                ->where('teacher_id', $teacher_id)
                ->select(
                    'rings.id',
                    'rings.name',
                    'rings.is_active',
                    'rings.created_at',
                    'users.id as teacher_id',
                    'users.first_name as teacher_fn',
                    'users.middle_name as teacher_mn',
                    'users.last_name as teacher_ln',
                    'centers.id as center_id',
                    'centers.name as center_name'
                )
                ->paginate(10);
            return response([
                'data' => $rings,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function getallringsbyteacher($teacher_id)
    {
        try {
            $rings = Rings::join('users', 'users.id', '=', 'rings.teacher_id')
                ->join('centers', 'centers.id', '=', 'rings.center_id')
                ->where('teacher_id', $teacher_id)
                ->where('is_active', 1)
                ->select(
                    'rings.id',
                    'rings.name',
                    'rings.is_active',
                    'rings.created_at',
                    'users.id as teacher_id',
                    'users.first_name as teacher_fn',
                    'users.middle_name as teacher_mn',
                    'users.last_name as teacher_ln',
                    'centers.id as center_id',
                    'centers.name as center_name'
                )
                ->get();
            return response([
                'data' => $rings,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
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
        try {
            if ($request->name && $request->teacher_id && $request->center_id) {
                $ring = Rings::create([
                    'name' => $request->name,
                    'teacher_id' => $request->teacher_id,
                    'center_id'  => $request->center_id
                ]);
                if ($ring) {
                    return response([
                        'message' => __('message.ring_added'),
                        'success' => true
                    ]);
                }
            }
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $ring = Rings::find($id);
            return response([
                'data' => $ring,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
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
        try {
            $ring = Rings::find($id);
            if ($ring) {
                $ring->name = $request->name;
                $ring->teacher_id = $request->teacher_id;
                $ring->is_active = $request->is_active;
                $ring->save();
                $check_update = count($ring->getChanges());
                if ($check_update > 0) {
                    return response([
                        'message' => __('message.ring_updated'),
                        'success' => true
                    ]);
                }
            }
        } catch (Exception $e) {
            return response($e->getMessage());
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
            $ring = Rings::find($id);
            $students = Students::where('ring_id', $id)->get();
            if (count($students) > 0) {
                return response([
                    'message' => __('message.cant_delete'),
                    'success' => false
                ]);
            } else {
                $ring->delete();
                return response([
                    'message' => __('message.ring_deleted'),
                    'success' => true
                ]);
            }
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }
}
