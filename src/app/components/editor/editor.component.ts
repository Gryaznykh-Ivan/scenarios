import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StageConfig } from 'konva/lib/Stage';
import { CircleConfig } from 'konva/lib/shapes/Circle';
import { debounceTime, fromEvent } from 'rxjs';
import { CoreShapeComponent } from 'src/app/libs/ng2-konva/components/core-shape.component';
import { StageComponent } from 'src/app/libs/ng2-konva/components/stage.component';

@Component({
  standalone: true,
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  imports: [StageComponent, CoreShapeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit, AfterViewInit {
  stage: Partial<StageConfig> = {
    width: 100,
    height: 100,
  };

  circle: CircleConfig = {
    x: 100,
    y: 100,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
  };

  constructor(private descroyRef: DestroyRef, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed(this.descroyRef), debounceTime(10))
      .subscribe(this.onResize);
  }

  ngAfterViewInit(): void {
    this.onResize();
  }

  onResize = () => {
    const container =
      document.querySelector<HTMLDivElement>('#editor-container');
    if (container === null) return;

    this.stage = {
      width: container.offsetWidth,
      height: container.offsetHeight,
    };

    this.cd.detectChanges()
  }
}
