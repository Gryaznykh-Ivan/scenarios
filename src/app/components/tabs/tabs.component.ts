import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITab } from 'src/app/models/tab.model';
import { createTabInitiated, rearrangeTabInitiated, removeTabInitiated, selectTabInitiated, selectTabs } from 'src/app/state/tabs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  tabs$ = this.store.select(selectTabs);

  constructor(private store: Store) {}

  ngOnInit() {}

  createTab() {
    this.store.dispatch(createTabInitiated())
  }

  removeTab(index: number) {
    this.store.dispatch(removeTabInitiated({ index }))
  }

  rearrangeTabs(event: CdkDragDrop<ITab[]>) {
    this.store.dispatch(rearrangeTabInitiated({
      currentIndex: event.currentIndex,
      previousIndex: event.previousIndex,
    }))
  }

  selectTab(index: number) {
    this.store.dispatch(selectTabInitiated({ index }))
  }
}
