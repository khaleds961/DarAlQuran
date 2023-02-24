<?php

namespace App\Http\Controllers;

use App\Models\Revisions;
use Exception;
use Illuminate\Http\Request;

class RevisonsController extends Controller
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
        try {
            if (
                $request->session_id &&
                $request->surah_from && $request->surah_to &&
                $request->ayyah_from && $request->ayyah_to &&
                $request->type
            ) {
                Revisions::create([
                    'session_id' => $request->session_id,
                    'surah_from' => $request->surah_from,
                    'surah_to'   => $request->surah_to,
                    'ayyah_from' => $request->ayyah_from,
                    'ayyah_to'   => $request->ayyah_to,
                    'notes'      => $request->notes,
                    'type'       => $request->type,
                    'riwayahname'  => $request->riwayahname
                ]);
                return response([
                    'message' => __('message.revision_added'),
                    'success' => true
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
    public function destroy($id)
    {
        //
    }
}
