import { Component } from '@angular/core';
import { IDraggableDelta } from 'src/app/directives/draggable.directive';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-bottomsidebar',
  templateUrl: './bottomsidebar.component.html',
})
export class BottomsidebarComponent {
  isDragging = false;
  bottomSidebarHeight = 128;
  bottomSidebarExtraHeight = 0;

  constructor(public toolbarService: ToolbarService){}

  onSidebarDragStart() {
    this.isDragging = true;
  }

  onBottomSidebarDragMove(delta: IDraggableDelta) {
    const newHeight = this.bottomSidebarHeight - delta.y;
    this.bottomSidebarExtraHeight =
      newHeight > 500
        ? 500 - this.bottomSidebarHeight
        : newHeight < 128
        ? 128 - this.bottomSidebarHeight
        : -delta.y;
  }

  onBottomSidebarDragEnd() {
    const sum = this.bottomSidebarHeight + this.bottomSidebarExtraHeight;
    this.bottomSidebarHeight = sum > 500 ? 500 : sum < 128 ? 128 : sum;
    this.bottomSidebarExtraHeight = 0;

    this.isDragging = false;
  }
}
