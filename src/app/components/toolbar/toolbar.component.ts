import { Component } from '@angular/core';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  constructor (public toolbarService: ToolbarService) {}

  
}
