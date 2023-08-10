import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFile, IFolder } from 'src/app/models/filesystem.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-folder',
    templateUrl: 'folder.component.html'
})

export class FolderComponent implements OnInit {
    @Input() id: number;
    @Input() name: string;
    @Input() models: IFile[];
    @Input() childFolders: IFolder[];
    @Input() selectedFileId: number | null;
    @Input() selectFile: (id: number | null) => void
    @Input() isRevealed = false
    @Input() isMainFolder = false

    constructor(public modalService: ModalService) { }

    ngOnInit() { }

    identify(index: number, item: any) {
        return item.id
    }
}