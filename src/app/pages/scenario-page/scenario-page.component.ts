import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { selectActiveTab, selectFileId } from 'src/app/state/tabs';

@Component({
  selector: 'scenario-page',
  templateUrl: './scenario-page.component.html',
})
export class ScenarioPageComponent implements OnInit {
  fileId$ = this.store.select(selectFileId)

  constructor(
    private title: Title,
    private store: Store
  ) {
    this.title.setTitle('Конструктор сценариев');
  }

  ngOnInit(): void {
    
  }
}
