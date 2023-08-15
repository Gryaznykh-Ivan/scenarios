import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  Subject,
  debounceTime,
  fromEvent,
  map,
  switchMap,
  takeUntil,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface IDraggableDelta {
  x: number;
  y: number;
}

@Directive({
  selector: '[draggable]',
})
export class DragableDirective implements OnInit, OnDestroy {
  @Input() dragHandle: string;
  @Input() dragTarget: string;
  @Output() onDragMove = new EventEmitter<IDraggableDelta>();
  @Output() onDragStart = new EventEmitter<void>();
  @Output() onDragEnd = new EventEmitter<void>();

  private handle: HTMLElement;
  private delta = { x: 0, y: 0 };

  private destroy$ = new Subject<void>();

  constructor(private elementRef: ElementRef, private zone: NgZone) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
  }

  ngAfterViewInit() {
    this.handle = this.dragHandle
      ? (document.querySelector(this.dragHandle) as HTMLElement)
      : this.elementRef.nativeElement;

    this.setupEvents();
  }

  private setupEvents() {
    let mousedown$ = fromEvent(this.handle, 'mousedown');
    let mousemove$ = fromEvent(document, 'mousemove');
    let mouseup$ = fromEvent(document, 'mouseup');

    let mousedrag$ = mousedown$.pipe(
      takeUntil(this.destroy$),
      switchMap((event) => {
        let startX = (event as MouseEvent).clientX;
        let startY = (event as MouseEvent).clientY;

        return mousemove$.pipe(
          debounceTime(5),
          map((event) => {
            event.preventDefault();
            this.delta = {
              x: (event as MouseEvent).clientX - startX,
              y: (event as MouseEvent).clientY - startY,
            };
          }),
          takeUntil(mouseup$)
        );
      })
    );

    mousedrag$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.delta.x === 0 && this.delta.y === 0) return;

      this.onDragMove.emit(this.delta);
    });

    mousedown$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.onDragStart.emit()
    });

    mouseup$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.delta = { x: 0, y: 0 };

      this.onDragEnd.emit()
    });

  }
}
