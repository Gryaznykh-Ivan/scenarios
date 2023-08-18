import { Component } from '@angular/core';
import { StageConfig } from 'konva/lib/Stage';
import { CircleConfig } from 'konva/lib/shapes/Circle';
import { CoreShapeComponent } from 'src/app/libs/ng2-konva/components/core-shape.component';
import { StageComponent } from 'src/app/libs/ng2-konva/components/stage.component';

@Component({
  standalone: true,
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  imports: [StageComponent, CoreShapeComponent],
})
export class EditorComponent {
  public configStage: Partial<StageConfig> = {
    width: 200,
    height: 500,
  };
  public configCircle: CircleConfig = {
    x: 100,
    y: 100,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
  };
}
