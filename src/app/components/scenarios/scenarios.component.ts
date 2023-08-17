import { Component, DestroyRef, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ScenarioService } from 'src/app/services/scenario.service';
import { IScenario } from 'src/app/models/scenario.model';
import { TabService } from 'src/app/services/tab.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWithNameComponent } from '../popups/confirm-with-name/confirm-with-name.component';
import { ConfirmComponent } from '../popups/confirm/confirm.component';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
})
export class ScenariosComponent implements OnInit {
  scenarios$: Observable<IScenario[]>;

  fileSearch = '';

  constructor(
    public tabService: TabService,
    public scenarioService: ScenarioService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getScenarios();
  }

  getScenarios() {
    this.scenarios$ = this.scenarioService.refetch$.pipe(
      switchMap(() => {
        return this.scenarioService.getScenarios();
      })
    );
  }

  createScenario() {
    const dialogRef = this.dialog.open(ConfirmWithNameComponent, {
      width: '100%',
      maxWidth: '500px',
      data: {
        title: 'Введите название сценария',
        YES: 'Создать',
        NO: 'Отмена',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.scenarioService
        .createScenario({ name: result.name, description: '' })
        .subscribe();
    });
  }

  removeScenario(event: MouseEvent, id: number) {
    event.stopPropagation()

    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '100%',
      maxWidth: '500px',
      data: {
        title: 'Вы уверены?',
        message: 'Сценарий будет удален',
        YES: 'Да',
        NO: 'Нет',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if (result !== true) return;

      this.scenarioService.removeScenario({ id }).subscribe();
    });
  }

  selectScenario(id: number) {
    this.tabService.updateActiveTab({ scenarioId: id })
  }
}
