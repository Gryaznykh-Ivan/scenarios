import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { TabService } from 'src/app/services/tab.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
})
export class SidebarsComponent {
  private startPosition = 0

  constructor(
    public toolbarService: ToolbarService,
    public tabService: TabService
  ) {}

  onDragMoved(data: CdkDragMove<HTMLDivElement>) {
    // this.consoleHeight -= data.delta.y
  }
}
