<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
	
	protected $table = 'companies';
    protected $fillable = [
        'name', 'slug', 'theme_color', 'theme_accent_color'
    ];
}
