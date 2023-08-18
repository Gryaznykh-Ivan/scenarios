import { Component } from '@angular/core';
import { CoreShapeComponent, StageComponent } from 'ng2-konva';

@Component({
  standalone: true,
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  imports: [StageComponent, CoreShapeComponent],
})
export class EditorComponent {

}
