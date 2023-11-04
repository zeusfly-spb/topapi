<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectGroup extends Model
{
  protected $guarded = [];
  use HasFactory;

  protected $casts = ['active' => 'boolean'];

  /**
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function user()
  {
    return $this->belongsTo(User::class);
  }

  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function projects()
  {
    return $this->hasMany(Project::class, 'project_group_id')->orderByDesc('id');
  }
}
