<?php

namespace App\Http\Controllers;

use App\Models\Assign;
use App\Models\Client;
use Illuminate\Http\Request;
use App\Http\Resources\ClientResources  as ClientResources;
use App\Http\Resources\AssignResources;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    /**
     * Autocomplete when we search client
     * 
     * @param  \Illuminate\Http\Request  $request
     */
    public function createClient(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name'       => 'required',
                'surname'    => 'required',
                'desktop_id' => 'required',
                'hours'      => 'required',
                'date'       => 'required',
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

        $clientCreated = Client::create([
            'name'    => $request->name,
            'surname' => $request->surname
        ]);

        $createdAssign = Assign::create([
            'desktop_id' => $request->desktop_id,
            'client_id'  => $clientCreated->id,
            'hours'      => $request->hours,
            'date'       => $request->date,
        ]);

        return response()->json([
            'success' => true,
            'message' => new AssignResources($createdAssign)
        ]);
    }


    /**
     * Autocomplete when we search client
     * 
     * @param  \Illuminate\Http\Request  $request
     */
    public function searchClient(Request $request)
    {
        $clientSearch = $request->clientInfo;
        $listClient   = Client::where('surname', 'like', '%' . $clientSearch . '%')->orWhere('name', 'like', '%' . $clientSearch . '%')->get();
        return ClientResources::collection($listClient);
    }
}
