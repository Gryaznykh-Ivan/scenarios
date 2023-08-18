import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IToolbar } from '../models/toolbar.model';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  private _toolbar$ = new BehaviorSubject<IToolbar>({
    scenarios: true,
    actions: false,
    properties: true,
    console: false,
  });

  constructor() {}

  get toolbar$() {
    return this._toolbar$.asObservable()
  }

  toggle(key: keyof IToolbar) {
    const toolbar = this._toolbar$.getValue()

    if (key === "scenarios" || key === "actions") {
      return this._toolbar$.next({ ...toolbar, scenarios: false, actions: false, [key]: !toolbar[key] })
    }

    this._toolbar$.next({ ...toolbar, [key]: !toolbar[key] })
  }
}
