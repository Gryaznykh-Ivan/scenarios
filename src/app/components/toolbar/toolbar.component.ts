import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IToolbar } from 'src/app/models/toolbar.model';
import { selectToolbar, toggleTabToolbarInitiated } from 'src/app/state/tabs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  toolbar$ = this.store.select(selectToolbar)

  constructor (private store: Store) {}

  toolbarToggle(toolbar: keyof IToolbar) {
    this.store.dispatch(toggleTabToolbarInitiated({ payload: { toolbar } }))
  }
}
