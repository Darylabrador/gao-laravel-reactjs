<?php

namespace Database\Factories;

use App\Models\Assign;
use Illuminate\Database\Eloquent\Factories\Factory;

class AssignFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Assign::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'hours' => "{$this->faker->numberBetween(8,16)}",
            'desktop_id' => $this->faker->numberBetween(1,5),
            'client_id' => $this->faker->numberBetween(1, 5),
        ];
    }
}
