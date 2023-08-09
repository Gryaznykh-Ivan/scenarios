import { Component, Input, OnInit } from '@angular/core';
import { IFile, IFolder } from 'src/app/models/filesystem.model';

@Component({
    selector: 'app-folder',
    templateUrl: 'folder.component.html'
})

export class FolderComponent implements OnInit {
    @Input() id: number;
    @Input() name: string;
    @Input() models: IFile[];
    @Input() childFolders: IFolder[];

    isRevealed = false

    constructor() { }

    ngOnInit() { }
}