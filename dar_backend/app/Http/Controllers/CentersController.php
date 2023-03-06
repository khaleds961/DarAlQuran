<?php

namespace App\Http\Controllers;

use App\Models\Centers;
use App\Models\Students_Centers_Teachers;
use Exception;
use Illuminate\Http\Request;

class CentersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $centers =  Centers::where('is_deleted', 0)->get();
            return response([
                'data' => $centers,
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
        if ($request->name && $request->location) {
            Centers::create([
                'name' => $request->name,
                'location' => $request->location
            ]);
            return response([
                'message' => __('message.center_added'),
                'success' => true
            ]);
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
            $center = Centers::select('location', 'name', 'id')->find($id);
            return response([
                'data' => $center,
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
    { }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $center = Centers::find($id);
        if ($center) {
            if ($request->name && $request->location) {
                $center->update([
                    'name' => $request->name,
                    'location' => $request->location
                ]);

                if (count($center->getchanges()) > 0) {
                    return response([
                        'message' => __('message.center_updated'),
                        'success' => true
                    ]);
                }
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
            $center =  Centers::find($id);
            $checkcenter = Students_Centers_Teachers::where('center_id', $center['id'])->get();
            if (count($checkcenter) == 0) {
                if ($center) {
                    $center->update(['is_deleted' => 1]);
                    return response([
                        'message' => __('message.center_deleted'),
                        'success' => true
                    ]);
                }
            } else {
                return response([
                    'message' => __('message.center_cannot_deleted'),
                    'success' => false
                ]);
            }
        } catch (Exception $e) {
            return response($e->getMessage());
        }
    }
}
