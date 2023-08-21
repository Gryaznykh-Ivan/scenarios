import { Component } from '@angular/core';
import { TabService } from 'src/app/services/tab.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  constructor (public tabService: TabService) {}

  
}
