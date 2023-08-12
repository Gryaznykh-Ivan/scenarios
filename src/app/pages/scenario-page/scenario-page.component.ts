import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'scenario-page',
  templateUrl: './scenario-page.component.html',
})
export class ScenarioPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

}
