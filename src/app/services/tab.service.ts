import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITab } from '../models/tab.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  tabs$ = new BehaviorSubject<ITab[]>([
    { title: 'Новая страница', isActive: true },
  ]);

  constructor() {}

  get activeTab() {
    return this.tabs$.getValue().find((c) => c.isActive === true);
  }

  createTab() {
    const tabs = this.tabs$.getValue();
    if (tabs.length > 20) return;

    this.tabs$.next([
      ...tabs.map((current) => ({ ...current, isActive: false })),
      { title: 'Новая страница', isActive: true },
    ]);
  }

  removeTab(index: number) {
    const tabs = this.tabs$.getValue();

    if (tabs[index].isActive === true) {
      const newTabs = tabs.filter((_, currentIndex) => index !== currentIndex);
      if (newTabs.length !== 0) newTabs[newTabs.length - 1].isActive = true;

      return this.tabs$.next(newTabs);
    }

    this.tabs$.next(tabs.filter((_, currentIndex) => index !== currentIndex));
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

  updateTab(index: number, data: Partial<ITab>) {
    this.tabs$.next(
      this.tabs$
        .getValue()
        .map((current, currentIndex) =>
          index === currentIndex ? { ...current, ...data } : current
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
