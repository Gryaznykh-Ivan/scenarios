import {
  CdkDragEnter,
  CdkDragMove,
  CdkDragStart,
} from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { IDraggableDelta } from 'src/app/directives/draggable.directive';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-sidebars',
  templateUrl: './sidebars.component.html',
})
export class SidebarsComponent {
  isDragging = false
  bottomSidebarHeight = 128;
  bottomSidebarExtraHeight = 0;
  rightSidebarWidth = 250;
  rightSidebarExtraWidth = 0;
  leftSidebarWidth = 250;
  leftSidebarExtraWidth = 0;

  constructor(
    public tabService: TabService
  ) {}

  onSidebarDragStart() {
    this.isDragging = true
  }

  onBottomSidebarDragMove(delta: IDraggableDelta){
    const newHeight = this.bottomSidebarHeight - delta.y;
    this.bottomSidebarExtraHeight =
    newHeight > 500
        ? 500 - this.bottomSidebarHeight
        : newHeight < 128
        ? 128 - this.bottomSidebarHeight
        : -delta.y;
  };

  onBottomSidebarDragEnd(){
    const sum = this.bottomSidebarHeight + this.bottomSidebarExtraHeight;
    this.bottomSidebarHeight = sum > 500 ? 500 : sum < 128 ? 128 : sum;
    this.bottomSidebarExtraHeight = 0;

    this.isDragging = false
  };

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

    this.isDragging = false
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

    this.isDragging = false
  }
}
