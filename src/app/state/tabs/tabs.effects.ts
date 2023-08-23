import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class TabsEffects {
  constructor(
    private actions$: Actions<any>,
  ) {}

  
}
