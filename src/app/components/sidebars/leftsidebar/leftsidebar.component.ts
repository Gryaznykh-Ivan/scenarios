import { Component } from '@angular/core';
import { IDraggableDelta } from 'src/app/directives/draggable.directive';
import { FileService } from 'src/app/services/file.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
})
export class LeftsidebarComponent {
  isDragging = false;
  leftSidebarWidth = 250;
  leftSidebarExtraWidth = 0;

  fileSearch = ""

  constructor(
    public toolbarService: ToolbarService,
    public fileService: FileService
  ) {}

  onSidebarDragStart() {
    this.isDragging = true;
  }

  onLeftSidebarDragMove(delta: IDraggableDelta) {
    const newWidth = this.leftSidebarWidth + delta.x;
    this.leftSidebarExtraWidth =
      newWidth > 500
        ? 500 - this.leftSidebarWidth
        : newWidth < 250
        ? 250 - this.leftSidebarWidth
        : delta.x;
  }

  onLeftSidebarDragEnd() {
    const sum = this.leftSidebarWidth + this.leftSidebarExtraWidth;
    this.leftSidebarWidth = sum > 500 ? 500 : sum < 250 ? 250 : sum;
    this.leftSidebarExtraWidth = 0;

    this.isDragging = false;
  }
}
