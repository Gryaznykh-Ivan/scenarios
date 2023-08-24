import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmWithNameComponent } from '../popups/confirm-with-name/confirm-with-name.component';
import { ConfirmComponent } from '../popups/confirm/confirm.component';
import { Store } from '@ngrx/store';
import {
  createScenarioInitiated,
  getScenariosInitiated,
  removeScenarioInitiated,
  selectError,
  selectLoading,
  selectScenarios,
} from 'src/app/state/scenario';
import { selectActiveTab, selectScenarioInitiated } from 'src/app/state/tabs';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScenariosComponent implements OnInit {
  loading$ = this.store.select(selectLoading);
  scenarios$ = this.store.select(selectScenarios);
  error$ = this.store.select(selectError);

  selectedScenarioId: number | null;
  fileSearch: string = '';

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store
      .select(selectActiveTab)
      .subscribe(
        (next) => (this.selectedScenarioId = next?.scenarioId ?? null)
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

      this.store.dispatch(
        createScenarioInitiated({
          payload: { name: result.name, description: '' },
        })
      );
    });
  }

  removeScenario(event: MouseEvent, id: number) {
    event.stopPropagation();

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
      if (result !== true) return;

      this.store.dispatch(removeScenarioInitiated({ payload: { id } }));
    });
  }

  selectScenario(id: number) {
    this.store.dispatch(
      selectScenarioInitiated({ payload: { scenarioId: id } })
    );
  }
}
