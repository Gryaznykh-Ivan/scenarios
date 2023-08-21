import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Konva from 'konva';
import { StageConfig } from 'konva/lib/Stage';
import { CircleConfig } from 'konva/lib/shapes/Circle';
import { Observable, debounceTime, fromEvent, switchMap } from 'rxjs';
import { CoreShapeComponent } from 'src/app/libs/ng2-konva/components/core-shape.component';
import { StageComponent } from 'src/app/libs/ng2-konva/components/stage.component';
import { NgKonvaEventObject } from 'src/app/libs/ng2-konva/interfaces/ngKonvaEventObject';
import { IScenario } from 'src/app/models/scenario.model';
import { EditorService } from 'src/app/services/editor.service';

@Component({
  standalone: true,
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  imports: [CommonModule, StageComponent, CoreShapeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('stage') stage: StageComponent;
  @ViewChild('layer') layer: CoreShapeComponent;

  scenario$: Observable<IScenario>;

  stageConfig: Partial<StageConfig> = {
    draggable: true,
  };

  circleConfig: CircleConfig = {
    x: 0,
    y: 0,
    radius: 10,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 2,
  };

  constructor(
    private descroyRef: DestroyRef,
    private cd: ChangeDetectorRef,
    public editorService: EditorService
  ) {}

  ngOnInit(): void {
    // fromEvent(window, 'resize')
    //   .pipe(takeUntilDestroyed(this.descroyRef), debounceTime(10))
    //   .subscribe(this.onResize);



    this.scenario$ = this.editorService.refetch$.pipe(
      switchMap(() => this.editorService.getScenario())
    );
  }

  ngAfterViewInit(): void {
    if (this.stage === undefined) return

    const container = this.stage.getStage().container();
    if (container === null) return;

    this.stageConfig = {
      ...this.stageConfig,
      width: container.offsetWidth,
      height: container.offsetHeight,
      x: container.offsetWidth / 2,
      y: container.offsetHeight / 2,
    };

    fromEvent(container, 'dragover')
      .pipe(takeUntilDestroyed(this.descroyRef))
      .subscribe((e) => e.preventDefault());

    fromEvent(container, 'drop')
      .pipe(takeUntilDestroyed(this.descroyRef))
      .subscribe((e) => {
        e.preventDefault();

        const stringData = (e as DragEvent).dataTransfer?.getData('action');
        if (stringData === undefined) return;

        const action = JSON.parse(stringData);

        console.log(action); // TODO INSERT ACTION TO CANVAS
      });

    this.cd.markForCheck();
  }

  onWheel(e: NgKonvaEventObject<WheelEvent>) {
    const event = e.event;
    if (!event) return;

    const nativeEvent = event.evt;
    nativeEvent.preventDefault();

    const stage = this.stage.getStage();
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    if (pointer === null) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = nativeEvent.deltaY > 0 ? oldScale * 1.1 : oldScale / 1.1;

    if (newScale > 4 || newScale < 0.5) return;

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    this.stageConfig = {
      ...this.stageConfig,
      ...newPos,
      scaleX: newScale,
      scaleY: newScale,
    };
  }

  onResize = () => {
    const container = this.stage.getStage().container();
    if (container === null) return;

    this.stageConfig = {
      ...this.stageConfig,
      width: container.offsetWidth,
      height: container.offsetHeight,
      x: container.offsetWidth / 2,
      y: container.offsetHeight / 2,
    };

    this.cd.markForCheck();
  };
}
