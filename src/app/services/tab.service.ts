import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ITab } from '../models/tab.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private _tabs$ = new BehaviorSubject<ITab[]>([
    { title: 'Новая страница', isActive: true },
  ]);

  constructor() {}

  get tabs$() {
    return this._tabs$.asObservable()
  }

  get activeTab() {
    return this._tabs$.getValue().find((c) => c.isActive === true);
  }

  get hasAnyTabs() {
    return this._tabs$.getValue().length > 0;
  }

  createTab() {
    const tabs = this._tabs$.getValue();
    if (tabs.length > 20) return;

    const newTabs = [
      ...tabs.map((current) => ({ ...current, isActive: false })),
      { title: 'Новая страница', isActive: true },
    ];

    this._tabs$.next(newTabs);
  }

  removeTab(index: number) {
    const tabs = this._tabs$.getValue();
    if (tabs.length === 1) return;

    if (tabs[index].isActive === true) {
      const newTabs = tabs.filter((_, currentIndex) => index !== currentIndex);
      if (newTabs.length !== 0) newTabs[newTabs.length - 1].isActive = true;

      this._tabs$.next(newTabs);

      return;
    }

    this._tabs$.next(tabs.filter((_, currentIndex) => index !== currentIndex));
  }

  selectTab(index: number) {
    const newTabs = this._tabs$
      .getValue()
      .map((current, currentIndex) =>
        index === currentIndex
          ? { ...current, isActive: true }
          : { ...current, isActive: false }
      );

    this._tabs$.next(newTabs);
  }

  updateActiveTab(data: Partial<ITab>) {
    if (this.hasAnyTabs === false) return;

    const newTabs = this._tabs$
      .getValue()
      .map((current, currentIndex) =>
        current.isActive === true
          ? { ...current, ...data, isActive: true }
          : current
      );

    this._tabs$.next(newTabs);
  }

  rearrangeTabs(event: CdkDragDrop<ITab[]>) {
    const tabs = this._tabs$.getValue();

    const [removed] = tabs.splice(event.previousIndex, 1);
    tabs.splice(event.currentIndex, 0, removed);

    this._tabs$.next(tabs);
  }
}
