import { Component } from '@angular/core';
import { IDraggableDelta } from 'src/app/directives/draggable.directive';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-rightsidebar',
  templateUrl: './rightsidebar.component.html',
})
export class RightsidebarComponent {
  isDragging = false;
  rightSidebarWidth = 250;
  rightSidebarExtraWidth = 0;

  constructor(public toolbarService: ToolbarService) {}

  onSidebarDragStart() {
    this.isDragging = true;
  }

  onRightSidebarDragMove(delta: IDraggableDelta) {
    const newWidth = this.rightSidebarWidth - delta.x;
    this.rightSidebarExtraWidth =
      newWidth > 500
        ? 500 - this.rightSidebarWidth
        : newWidth < 250
        ? 250 - this.rightSidebarWidth
        : -delta.x;
  }

  onRightSidebarDragEnd() {
    const sum = this.rightSidebarWidth + this.rightSidebarExtraWidth;
    this.rightSidebarWidth = sum > 500 ? 500 : sum < 250 ? 250 : sum;
    this.rightSidebarExtraWidth = 0;

    this.isDragging = false;
  }
}
