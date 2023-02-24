<?php

namespace App\Http\Controllers;

use App\Models\Sessions;
use App\Models\Students_Centers_Teachers;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class SessionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($center_id)
    {
        try {
            if ($center_id != 0) {
                $sessions = Sessions::join('students_centers_teachers', 'students_centers_teachers.id', '=', 'quran_sessions.center_student_teacher_id')
                    ->join('centers', 'centers.id', '=', 'students_centers_teachers.center_id')
                    ->join('users', 'users.id', '=', 'students_centers_teachers.user_id')
                    ->join('students', 'students.id', '=', 'students_centers_teachers.student_id')
                    ->select(
                        'students_centers_teachers.id',
                        'users.id as teacher_id',
                        'users.first_name as teacher_fn',
                        'users.middle_name as teacher_mn',
                        'users.last_name as teacher_ln',
                        'students.id as student_id',
                        'students.first_name as student_fn',
                        'students.middle_name as student_mn',
                        'students.last_name as student_ln',
                        'centers.id as center_id',
                    )
                    ->where('centers.id', $center_id)
                    ->orderBy('student_id')
                    ->distinct()
                    ->get();

                $session_arr = [];

                foreach ($sessions as $session) {
                    $session_arr[] = [
                        'session_id' => $session->id,
                        'student_fn' => $session->student_fn,
                        'student_mn' => $session->student_mn,
                        'student_ln' => $session->student_ln,
                        'teacher_fn' => $session->teacher_fn,
                        'teacher_mn' => $session->teacher_mn,
                        'teacher_ln' => $session->teacher_ln,
                        'day_time' => Sessions::where('center_student_teacher_id', $session->id)->select('weekday', 'session_time')->get()
                    ];
                }
            } else {
                $sessions = Sessions::join('students_centers_teachers', 'students_centers_teachers.id', '=', 'quran_sessions.center_student_teacher_id')
                    ->join('centers', 'centers.id', '=', 'students_centers_teachers.center_id')
                    ->join('users', 'users.id', '=', 'students_centers_teachers.user_id')
                    ->join('students', 'students.id', '=', 'students_centers_teachers.student_id')
                    ->select(
                        'students_centers_teachers.id',
                        'users.id as teacher_id',
                        'users.first_name as teacher_fn',
                        'users.middle_name as teacher_mn',
                        'users.last_name as teacher_ln',
                        'students.id as student_id',
                        'students.first_name as student_fn',
                        'students.middle_name as student_mn',
                        'students.last_name as student_ln',
                        'centers.id as center_id',
                    )
                    ->orderBy('student_id')
                    ->distinct()
                    ->get();

                $session_arr = [];

                foreach ($sessions as $session) {
                    $session_arr[] = [
                        'session_id' => $session->id,
                        'student_fn' => $session->student_fn,
                        'student_mn' => $session->student_mn,
                        'student_ln' => $session->student_ln,
                        'teacher_fn' => $session->teacher_fn,
                        'teacher_mn' => $session->teacher_mn,
                        'teacher_ln' => $session->teacher_ln,
                        'day_time' => Sessions::where('center_student_teacher_id', $session->id)->select('weekday', 'session_time')->get()
                    ];
                }
            }
            $data = $this->paginate($session_arr);

            return response([
                'data' => $data,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function getsessionsbystcente($ct_st_te)
    {
        $sessions = Sessions::join('revisions', 'revisions.session_id', '=', 'quran_sessions.id')
            ->where('quran_sessions.center_student_teacher_id', $ct_st_te)
            ->select(
                'quran_sessions.*',
                'revisions.id as revision_id',
                'revisions.surah_from',
                'revisions.surah_to',
                'revisions.notes',
                'revisions.created_at  as rivison_date',
                'revisions.type',
                'revisions.ayyah_from',
                'revisions.ayyah_to',
                'revisions.riwayahname'
            )
            ->paginate(10);
        return response([
            'data' => $sessions,
            'success' => true
        ]);
    }

    public function getsessionsbyteacher($center_id, $teacher_id)
    {
        try {
            $sessions = Sessions::join('students_centers_teachers', 'students_centers_teachers.id', '=', 'quran_sessions.center_student_teacher_id')
                ->join('centers', 'centers.id', '=', 'students_centers_teachers.center_id')
                ->join('users', 'users.id', '=', 'students_centers_teachers.user_id')
                ->join('students', 'students.id', '=', 'students_centers_teachers.student_id')
                ->select(
                    'students_centers_teachers.id',
                    'users.id as teacher_id',
                    'users.first_name as teacher_fn',
                    'users.middle_name as teacher_mn',
                    'users.last_name as teacher_ln',
                    'students.id as student_id',
                    'students.first_name as student_fn',
                    'students.middle_name as student_mn',
                    'students.last_name as student_ln',
                    'centers.id as center_id',
                )
                // ->where('centers.id', $center_id)
                // ->where('users.id', $teacher_id)
                ->where(function ($query) use ($center_id, $teacher_id) {
                    if ($center_id != 0) {
                        $query->where('centers.id', $center_id);
                    }
                    if ($teacher_id != 0) {
                        $query->where('users.id', $teacher_id);
                    }
                })
                ->orderBy('student_id')
                ->distinct()
                ->get();

            $session_arr = [];

            foreach ($sessions as $session) {
                $session_arr[] = [
                    'session_id' => $session->id,
                    'student_fn' => $session->student_fn,
                    'student_mn' => $session->student_mn,
                    'student_ln' => $session->student_ln,
                    'teacher_fn' => $session->teacher_fn,
                    'teacher_mn' => $session->teacher_mn,
                    'teacher_ln' => $session->teacher_ln,
                    'day_time'   => Sessions::where('center_student_teacher_id', $session->id)->select('weekday', 'session_time')->get()
                ];
            }

            $data = $this->paginate($session_arr);

            return response([
                'data' => $data,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function getsessionsbycenter($center_id, $teacher_id)
    { }

    public function paginate($items, $perPage = 10, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }

    public function getSessionsById($st_ct_te)
    {
        try {
            $sessions = Sessions::where('center_student_teacher_id', $st_ct_te)->get();
            return response([
                'data' => $sessions,
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
            $center_id = $request['center_id'];
            $student_id = $request['student_id'];
            $teacher_id = $request['user_id'];
            $st_ct_te_id = Students_Centers_Teachers::where('center_id', $center_id)
                ->where('student_id', $student_id)
                ->where('user_id', $teacher_id)->first()->id;
            $time = $request['time'];
            $day = $request['day'];
            $check_session = Sessions::where('center_student_teacher_id', $st_ct_te_id)
                ->where('weekday', $day)->first();

            if (!$check_session) {
                $session = new Sessions();
                $session->center_student_teacher_id = $st_ct_te_id;
                $session->weekday = $day;
                $session->session_time = $time;
                $session->save();

                if ($session) return response([
                    'message' => __('message.session_added'),
                    'success' => true
                ]);
            } else {
                return response([
                    'message' => __('message.session_exist'),
                    'success' => false
                ]);
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
    public function destroy($id, $st_ce_te)
    {
        try {
            $session = Sessions::find($id);
            if ($session) {
                $session->delete();
                $check = Sessions::where('center_student_teacher_id', $st_ce_te)->get();
                return response([
                    'message' => __('message.session_deleted'),
                    'success' => true,
                    'check'   => count($check)
                ]);
            }
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }
}
