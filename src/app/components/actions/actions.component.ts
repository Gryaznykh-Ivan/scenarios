import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { IAction, IActionGroup } from 'src/app/models/action.model';
import { ActionService } from 'src/app/services/action.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsComponent implements OnInit {
  actionGroups$: Observable<IActionGroup[]>;

  constructor(
    public actionService: ActionService,
  ) {}

  ngOnInit() {
    this.actionGroups$ = this.actionService.getGroupedActions();
  }

  onDragStart(event: DragEvent, action: IAction) {
    event.dataTransfer?.setData('action', JSON.stringify(action))
  }
}
