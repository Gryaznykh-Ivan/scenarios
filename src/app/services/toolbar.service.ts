import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IToolbar } from '../models/toolbar.model';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  toolbar$ = new BehaviorSubject<IToolbar>({
    scenarios: true,
    actions: false,
    properties: true,
    console: true,
  });

  constructor() {}

  toggle(key: keyof IToolbar) {
    const toolbar = this.toolbar$.getValue()

    if (key === "scenarios" || key === "actions") {
      return this.toolbar$.next({ ...toolbar, scenarios: false, actions: false, [key]: !toolbar[key] })
    }

    this.toolbar$.next({ ...toolbar, [key]: !toolbar[key] })
  }
}
