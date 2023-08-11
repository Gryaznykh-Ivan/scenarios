import { Component } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";


@Component({
    selector: "app-select-model-page",
    templateUrl: "./select-model-page.component.html",
})
export class SelectModelPageComponent {
    constructor(private title: Title, private meta: Meta) {
        this.title.setTitle("Выбор модели")
        this.meta.addTags([
            { name: "description", content: "TODO" }
        ])
    }
}