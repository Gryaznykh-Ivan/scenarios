import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: "scenario-page",
    templateUrl: "./scenario-page.component.html"
})
export class ScenarioPageComponent implements OnInit {
    constructor(private route: ActivatedRoute) { }

    scenarioId: number | undefined

    ngOnInit(): void {
        this.route.params.subscribe(params => this.scenarioId = +params['scenarioId'])
    }
}