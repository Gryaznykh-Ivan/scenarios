import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateFileComponent } from 'src/app/components/popups/create-file/create-file.component';

@Component({
  selector: 'scenario-page',
  templateUrl: './scenario-page.component.html',
})
export class ScenarioPageComponent implements OnInit {
  scenarioId: number | undefined;
  test = CreateFileComponent

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => (this.scenarioId = +params['scenarioId'])
    );
  }
}
