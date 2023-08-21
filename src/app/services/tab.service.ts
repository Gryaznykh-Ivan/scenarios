import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ITab } from '../models/tab.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { IToolbar } from '../models/toolbar.model';

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private _tabs$ = new BehaviorSubject<ITab[]>([
    {
      title: 'Новая страница',
      isActive: true,
      toolbar: {
        scenarios: true,
        actions: false,
        properties: true,
        console: false,
      },
    },
  ]);

  constructor() {}

  get tabs$() {
    return this._tabs$.asObservable();
  }

  get activeTab() {
    return this._tabs$.getValue().find((c) => c.isActive === true);
  }

  get hasAnyTabs() {
    return this._tabs$.getValue().length > 0;
  }

  get toolbar() {
    return this.activeTab?.toolbar
  }

  createTab() {
    const tabs = this._tabs$.getValue();
    if (tabs.length > 20) return;

    const newTabs = [
      ...tabs.map((current) => ({ ...current, isActive: false })),
      {
        title: 'Новая страница',
        isActive: true,
        toolbar: {
          scenarios: true,
          actions: false,
          properties: true,
          console: false,
        },
      },
    ];

    this._tabs$.next(newTabs);
  }

  toolbarToggle(key: keyof IToolbar) {
    const activeTab = this.activeTab;
    if (activeTab === undefined) return;

    const toolbar = activeTab.toolbar;

    if (key === 'scenarios' || key === 'actions') {
      return this.updateActiveTab({
        toolbar: {
          ...toolbar,
          scenarios: false,
          actions: false,
          [key]: !toolbar[key],
        },
      });
    }

    this.updateActiveTab({
      toolbar: {
        ...toolbar,
        [key]: !toolbar[key],
      },
    });
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

  // Метод проверяет наличие несуществующий значений у ключей
  // Если они есть - ставит undefined
  maintainIntegrity(key: keyof ITab, value: any) {
    const newTabs = this._tabs$
      .getValue()
      .map((current) =>
        current[key] === value ? { ...current, [key]: undefined } : current
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
