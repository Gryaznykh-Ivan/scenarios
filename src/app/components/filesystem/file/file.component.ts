import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-file',
    templateUrl: 'file.component.html'
})

export class FileComponent implements OnInit {
    @Input() id: number;
    @Input() name: string;
    @Input() selectedFileId: number | null;
    @Input() selectFile: (id: number | null) => void

    constructor() { }

    ngOnInit() { }

    identify(index: number, item: any) {
        return item.id
    }
}