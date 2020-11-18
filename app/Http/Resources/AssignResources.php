<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AssignResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "idAssign" => $this->id,
            "client"   => new ClientResources($this->clients),
            "hours"    => $this->hours,
            "date"     => $this->date
        ];
    }
}
