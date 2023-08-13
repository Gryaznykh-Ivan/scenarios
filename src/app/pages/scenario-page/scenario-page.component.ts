import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'scenario-page',
  templateUrl: './scenario-page.component.html',
})
export class ScenarioPageComponent implements OnInit {
  constructor(public tabService: TabService, private title: Title) {
    this.title.setTitle('Конструктор сценариев');
  }

  ngOnInit(): void {}
}
