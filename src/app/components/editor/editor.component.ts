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
import { Store } from '@ngrx/store';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { StageConfig } from 'konva/lib/Stage';
import { PathConfig } from 'konva/lib/shapes/Path';
import { Observable, debounceTime, fromEvent, switchMap } from 'rxjs';
import { CoreShapeComponent } from 'src/app/libs/ng2-konva/components/core-shape.component';
import { StageComponent } from 'src/app/libs/ng2-konva/components/stage.component';
import { KonvaComponent } from 'src/app/libs/ng2-konva/interfaces/ko-component.interface';
import { NgKonvaEventObject } from 'src/app/libs/ng2-konva/interfaces/ngKonvaEventObject';
import { IScenario } from 'src/app/models/scenarios.model';
import { EditorService } from 'src/app/services/editor.service';
import { selectScenario } from 'src/app/state/scenario';

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

  scenario$ = this.store.select(selectScenario);

  stageConfig: Partial<StageConfig> = {
    draggable: true,
  };

  constructor(
    private destroyRef: DestroyRef,
    private cd: ChangeDetectorRef,
    private store: Store,
    public editorService: EditorService
  ) {}

  ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(10))
      .subscribe(this.onResize);
  }

  ngAfterViewInit(): void {
    const stage = this.stage.getStage();
    const container = stage.container();

    if (container === null) return;

    this.stageConfig = {
      ...this.stageConfig,
      width: container.offsetWidth,
      height: container.offsetHeight,
      x: container.offsetWidth / 2,
      y: container.offsetHeight / 2,
    };

    fromEvent(container, 'dragover')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => e.preventDefault());

    fromEvent(container, 'drop')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        e.preventDefault();

        const stringData = (e as DragEvent).dataTransfer?.getData('action');
        if (stringData === undefined) return;

        const action = JSON.parse(stringData);

        console.log(action); // TODO INSERT ACTION TO CANVAS
      });

    this.scenario$.subscribe((next) => next !== null && this.drawStage(next));

    this.cd.markForCheck();
  }

  drawStage(scenario: IScenario) {
    const layer = this.layer.getStage() as Layer;
    
    layer.clearCache()

    for (let node of scenario.nodes) {
      layer.add(
        new Konva.Path({
          x: node.posX,
          y: node.posY,
          width: node.width,
          height: node.height,
          data: 'M213.1,6.7c-32.4-14.4-73.7,0-88.1,30.6C110.6,4.9,67.5-9.5,36.9,6.7C2.8,22.9-13.4,62.4,13.5,110.9C33.3,145.1,67.5,170.3,125,217c59.3-46.7,93.5-71.9,111.5-106.1C263.4,64.2,247.2,22.9,213.1,6.7z',
          fill: node.backgroundColor,
          stroke: node.borderColor,
          strokeWidth: 2
        })
      );
    }
    
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
