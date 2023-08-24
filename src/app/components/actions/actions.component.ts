import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAction, IActionGroup } from 'src/app/models/action.model';
import { ActionService } from 'src/app/services/action.service';
import { selectGroupedActions, selectLoading } from 'src/app/state/actions';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsComponent {
  loading$ = this.store.select(selectLoading);
  groupedActions$ = this.store.select(selectGroupedActions);

  constructor(
    public actionService: ActionService,
    private sanitizer: DomSanitizer,
    private store: Store
  ) {}

  createActionPreview(action: IAction) {
    let shape;

    switch (action.shape) {
      case 'circle':
        shape = `<ellipse cx="250" cy="250" rx="240" ry="240" fill="${action.backgroundColor}" stroke-width="20" stroke="${action.borderColor}"/>`;
        break;
      case 'triangle':
        shape = `<polygon points="0,500 250,0 500,500" fill="${action.borderColor}"/>
                   <polygon points="250,44.5 467.8,480.1 32.2,480.1" fill="${action.backgroundColor}"/>`;
        break;
      case 'triangle180':
        shape = `<polygon points="0,0 250,500 500,0" fill="${action.borderColor}"/>
                   <polygon points="32.2,19.9 250,455.5 467.8,19.9" fill="${action.backgroundColor}"/>`;
        break;
      case 'rhomb':
        shape = `<path d="M 250,486 14,250 250,14 486,250 Z" fill="${action.backgroundColor}" stroke-width="19.8" stroke="${action.borderColor}"/>`;
        break;
      case 'rectangle':
        shape = `<rect width="480" height="480" x="10" y="10" rx="65" ry="65" fill="${action.backgroundColor}" stroke-width="20" stroke="${action.borderColor}"/>`;
        break;
      case 'pentagon':
        shape = `<path d="M 400,490 H 100 L 12,225 250,14 488,225 Z" fill="${action.backgroundColor}" stroke-width="20" stroke="${action.borderColor}"/>`;
        break;
      case 'hexagon':
        shape = `<path d="M 490,150 490.41631,348.99495 350,490 151.00505,490.41631 10,350 9.5836944,151.00505 150,10 348.99495,9.5836944 Z" fill="${action.backgroundColor}" stroke-width="19.8" stroke="${action.borderColor}"/>`;
        break;
    }

    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg width="100%" height="100%" viewBox="0 0 500.0 500.0" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          ${shape}
        </g>
      </svg>`
    );
  } 

  onDragStart(event: DragEvent, action: IAction) {
    event.dataTransfer?.setData('action', JSON.stringify(action))
  }
}
