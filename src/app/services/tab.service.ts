import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITab } from '../models/tab.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  tabs$ = new BehaviorSubject<ITab[]>([
    { title: 'test', isActive: true },
    { title: 'test 1', isActive: false },
    { title: 'test 2', isActive: false },
  ]);

  constructor() {}

  createTab(title: string) {
    const tabs = this.tabs$.getValue();
    if (tabs.length > 20) return

    this.tabs$.next([
      ...tabs.map((current) => ({ ...current, isActive: false })),
      { title, isActive: true },
    ]);
  }

  removeTab(index: number) {
    this.tabs$.next(
      this.tabs$.getValue().filter((_, currentIndex) => index !== currentIndex)
    );
  }

  selectTab(index: number) {
    this.tabs$.next(
      this.tabs$
        .getValue()
        .map((current, currentIndex) =>
          index === currentIndex
            ? { ...current, isActive: true }
            : { ...current, isActive: false }
        )
    );
  }

  rearrangeTabs(event: CdkDragDrop<ITab[]>) {
    const tabs = this.tabs$.getValue();

    const [removed] = tabs.splice(event.previousIndex, 1);
    tabs.splice(event.currentIndex, 0, removed);

    this.tabs$.next(tabs);
  }
}
