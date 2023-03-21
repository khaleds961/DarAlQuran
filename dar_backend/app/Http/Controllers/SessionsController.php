<?php

namespace App\Http\Controllers;

use App\Models\Sessions;
use App\Models\Students;
use App\Models\Students_Centers_Teachers;
use App\Models\Users;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

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
                        'students_centers_teachers.id as session_id',
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
                    ->where('quran_sessions.is_deleted', 0)
                    ->where('centers.id', $center_id)
                    ->orderBy('student_id')
                    ->groupBy('student_id')
                    ->paginate(10);

                $sessions->getCollection()->map(function ($item) {
                    $item->day_time = Sessions::where('center_student_teacher_id', $item->id)->select('weekday', 'session_time')->get();
                    return $item;
                });
            } else {
                $sessions = Sessions::join('students_centers_teachers', 'students_centers_teachers.id', '=', 'quran_sessions.center_student_teacher_id')
                    ->join('centers', 'centers.id', '=', 'students_centers_teachers.center_id')
                    ->join('users', 'users.id', '=', 'students_centers_teachers.user_id')
                    ->join('students', 'students.id', '=', 'students_centers_teachers.student_id')
                    ->select(
                        'students_centers_teachers.id as session_id',
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
                    ->groupBy('student_id')
                    ->paginate(10);

                $sessions->getCollection()->map(function ($item) {
                    $item->day_time = Sessions::where('center_student_teacher_id', $item->id)->select('weekday', 'session_time')->get();
                    return $item;
                });
            }
            return response([
                'data' => $sessions,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function getsessionsbystcente($ct_st_te, $start_date = 0, $end_date = 0)
    {
        $sessions = Sessions::join('revisions', 'revisions.session_id', '=', 'quran_sessions.id')
            ->where('quran_sessions.center_student_teacher_id', $ct_st_te)
            ->where(function ($query) use ($start_date, $end_date) {
                if ($start_date != 0 && $end_date != 0) {
                    $query->whereBetween('revisions.date', [$start_date, $end_date]);
                }
            })
            ->select(
                'quran_sessions.*',
                'revisions.id as revision_id',
                'revisions.surah_from',
                'revisions.surah_to',
                'revisions.notes',
                'revisions.date as rivison_date',
                'revisions.type',
                'revisions.absence_type',
                'revisions.ayyah_from',
                'revisions.ayyah_to',
                'revisions.page_from',
                'revisions.page_to',
                'revisions.riwayahname'
            )
            ->orderBy('date', 'desc')
            ->paginate(20);

        $student_teacher = Students_Centers_Teachers::join('students', 'students.id', 'students_centers_teachers.student_id')
            ->join('users', 'users.id', 'students_centers_teachers.user_id')
            ->select(
                'users.id as teacher_id',
                'users.first_name as teacher_fn',
                'users.middle_name as teacher_mn',
                'users.last_name as teacher_ln',
                'students.id as student_id',
                'students.first_name as student_fn',
                'students.middle_name as student_mn',
                'students.last_name as student_ln'
            )
            ->where('students_centers_teachers.id', $ct_st_te)
            ->first();

        return response([
            'data' => $sessions,
            'student_teacher' => $student_teacher,
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
                    'students_centers_teachers.id as session_id',
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
                ->where(function ($query) use ($center_id, $teacher_id) {
                    if ($center_id != 0) {
                        $query->where('centers.id', $center_id);
                    }
                    if ($teacher_id != 0) {
                        $query->where('users.id', $teacher_id);
                    }
                })
                ->orderBy('student_id')
                ->groupBy('student_id')
                ->paginate(10);

            $sessions->getCollection()->map(function ($item) {
                $item->day_time = Sessions::where('center_student_teacher_id', $item->id)->select('weekday', 'session_time')->get();
                return $item;
            });

            return response([
                'data' => $sessions,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function getsessionsbyids($teacher_id, $student_id, Request $request)
    {
        try {
            $ct_st_te = Students_Centers_Teachers::where('user_id', $teacher_id)
                ->where('student_id', $student_id)->first()->id;
            return $this->getsessionsbystcente($ct_st_te, $request->start_date, $request->end_date);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function paginate($items, $perPage = 10, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }

    public function getSessionsById($st_ct_te)
    {
        try {
            $sessions = Sessions::where('center_student_teacher_id', $st_ct_te)
                ->where('is_deleted', 0)
                ->orderBy('weekday_id')->get();
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

            $time = $request['time'];
            $day = $request['day'];
            $day_id = $request['day_id'];

            $st_ct_te_id = Students_Centers_Teachers::where('center_id', $center_id)
                ->where('user_id', $teacher_id)
                ->where('student_id', $student_id)->first()->id;

            $check_session = Sessions::join('students_centers_teachers', 'students_centers_teachers.id', '=', 'quran_sessions.center_student_teacher_id')
                ->where('center_id', $center_id)
                ->where('user_id', $teacher_id)
                ->where('weekday', $day)
                ->where('session_time', $time)
                ->first();

            $check_student_day = Sessions::join('students_centers_teachers', 'students_centers_teachers.id', '=', 'quran_sessions.center_student_teacher_id')
                ->where('center_id', $center_id)
                ->where('user_id', $teacher_id)
                ->where('weekday', $day)
                ->where('student_id', $student_id)
                ->first();

            if ($check_student_day) {
                return response([
                    'message' => __('message.session_day_exist'),
                    'success' => false
                ]);
            } else {
                if ($check_session) {
                    return response([
                        'message' => __('message.session_exist'),
                        'success' => false
                    ]);
                } else {
                    $session = new Sessions();
                    $session->center_student_teacher_id = $st_ct_te_id;
                    $session->weekday = $day;
                    $session->weekday_id = $day_id;
                    $session->session_time = $time;
                    $session->save();

                    if ($session) return response([
                        'message' => __('message.session_added'),
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
                $session->update([
                    'is_deleted' => 1
                ]);
                $check = Sessions::where('center_student_teacher_id', $st_ce_te)
                    ->where('is_deleted', 0)
                    ->get();
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

    public function MonthlyTeacherReport(Request $request, $center_id, $teacher_id)
    {
        try {
            $students = Students::join('students_centers_teachers', 'students_centers_teachers.student_id', '=', 'students.id')
                ->join('quran_sessions', 'quran_sessions.center_student_teacher_id', '=', 'students_centers_teachers.id')
                ->join('revisions', 'revisions.session_id', '=', 'quran_sessions.id')
                ->select(
                    'students_centers_teachers.id as st_ct_te_id',
                    'students.id as student_id',
                    DB::raw("CONCAT(students.first_name, ' ',students.middle_name, ' ',students.last_name) AS full_name"),
                )
                ->groupBy('student_id')
                ->where('center_id', $center_id)
                ->where('user_id', $teacher_id)
                ->paginate(5);

            $students->getCollection()->map(function ($item) use ($request) {
                $item->sessions = Sessions::join('revisions', 'revisions.session_id', '=', 'quran_sessions.id')
                    ->where('center_student_teacher_id', $item->st_ct_te_id)
                    ->whereBetween('date', [$request->start, $request->end])
                    ->select(
                        'revisions.id as revision_id',
                        'revisions.date as revision_date',
                        'revisions.surah_from',
                        'revisions.surah_to',
                        'revisions.ayyah_from',
                        'revisions.ayyah_to',
                        'revisions.page_from',
                        'revisions.page_to',
                        'revisions.notes',
                        'revisions.type',
                        'revisions.absence_type',
                    )->orderBy('revision_date')->get();
                return $item;
            });

            return response([
                'data' => $students,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }

    public function teacherschedule($center_id, $teacher_id)
    {
        try {
            $schedule = Sessions::join('students_centers_teachers', 'students_centers_teachers.id', '=', 'quran_sessions.center_student_teacher_id')
                ->join('students', 'students.id', '=', 'students_centers_teachers.student_id')
                ->where('center_id', $center_id)
                ->where('user_id', $teacher_id)
                ->where('quran_sessions.is_deleted', 0)
                ->select(
                    'quran_sessions.*',
                    'students.id as student_id',
                    'students.first_name as student_fn',
                    'students.middle_name as student_mn',
                    'students.last_name as student_ln',
                    'students_centers_teachers.user_id'
                )
                ->orderBy('weekday_id')->get()->groupBy('weekday_id');

            return response([
                'data' => $schedule,
                'success' => true
            ]);
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }
}
