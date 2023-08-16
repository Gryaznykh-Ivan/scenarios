import {
  CdkDragEnter,
  CdkDragMove,
  CdkDragStart,
} from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDraggableDelta } from 'src/app/directives/draggable.directive';
import { TabService } from 'src/app/services/tab.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
})
export class SidebarsComponent {
  constructor(
    public tabService: TabService
  ) {}

}
