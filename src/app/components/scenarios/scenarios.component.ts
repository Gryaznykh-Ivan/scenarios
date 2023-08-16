import { Component, Input, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ScenarioService } from 'src/app/services/scenario.service';
import { IScenario } from 'src/app/models/scenario.model';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
})
export class ScenariosComponent implements OnInit {
  scenarios$: Observable<IScenario[]>;

  fileSearch = '';

  constructor(
    public scenarioService: ScenarioService,
    private tabService: TabService
  ) {}

  ngOnInit() {
    this.getScenarios();
  }

  getScenarios() {
    const fileId = this.tabService.activeTab?.fileId;
    if (fileId === undefined) return;

    this.scenarios$ = this.scenarioService.refetch$.pipe(
      switchMap(() => this.scenarioService.getScenarios({ id: fileId }))
    );
  }
}
