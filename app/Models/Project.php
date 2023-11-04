<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
  use HasFactory;

  protected $guarded = [];
  protected $casts = ['active' => 'boolean'];


  /**
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function ProjectGroup()
  {
    return $this->belongsTo(ProjectGroup::class, 'project_group_id');
  }
}
