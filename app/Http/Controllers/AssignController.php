<?php

namespace App\Http\Controllers;

use App\Http\Resources\AssignResources;
use App\Models\Assign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AssignController extends Controller
{
    /**
     * Set attribution 
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function setAttribution(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'desktop_id' => 'required',
                'client_id' => 'required',
                'hours' => 'required',
                'date' => 'required',
            ],
            [
                'required' => 'Le champ :attribute est requis',
            ]
        );

        $errors = $validator->errors();

        if (count($errors) != 0) {
            return response()->json([
                'success' => false,
                'message' => $errors->first()
            ]);
        }

        $assignExist = Assign::where([
            "desktop_id" => $request->desktop_id,
            "client_id" => $request->client_id,
            "hours" => $request->hours,
            "date" => $request->date,
        ])->count();

        if($assignExist != 0) {
            return response()->json([
                'success' => false,
                'message' => "Attribution existe déjà"
            ]);
        }
        
        $assignCreate = Assign::create($request->all());
        return new AssignResources($assignCreate);
    }



    /**
     * delete attribution 
     *
     */
    public function deleteAttribution($id){
        Assign::destroy($id);
        return response()->json([
            'success' => true,
            'message' => "Suppression réussie"
        ]);
    }

}
