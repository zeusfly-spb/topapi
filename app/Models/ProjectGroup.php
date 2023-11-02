<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectGroup extends Model
{
  protected $guarded = [];
  use HasFactory;

  protected $casts = ['active' => 'boolean'];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}