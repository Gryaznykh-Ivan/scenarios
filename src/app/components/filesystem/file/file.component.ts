import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-file',
    templateUrl: 'file.component.html'
})

export class FileComponent implements OnInit {
    @Input() id: number;
    @Input() name: string;


    constructor() { }

    ngOnInit() { }
}