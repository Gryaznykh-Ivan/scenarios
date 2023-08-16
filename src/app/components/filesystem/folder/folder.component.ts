import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IFile, IFolder } from 'src/app/models/filesystem.model';
import { CreateFileComponent } from '../../popups/create-file/create-file.component';
import { CreateFolderComponent } from '../../popups/create-folder/create-folder.component';
import { RenameFileComponent } from '../../popups/rename-file/rename-file.component';
import { RenameFolderComponent } from '../../popups/rename-folder/rename-folder.component';
import { RemoveFolderComponent } from '../../popups/remove-folder/remove-folder.component';

@Component({
    selector: 'app-folder',
    templateUrl: 'folder.component.html'
})

export class FolderComponent implements OnInit {
    @Input() id: number;
    @Input() name: string;
    @Input() files: IFile[];
    @Input() childFolders: IFolder[];
    @Input() selectedFileId: number | null;
    @Input() selectFile: (data: IFile) => void
    @Input() isRevealed = false
    @Input() isMainFolder = false

    constructor(
        private dialog: MatDialog
    ) { }

    ngOnInit() { }

    identify(index: number, item: any) {
        return item.id
    }

    createFile() {
        this.dialog.open(CreateFileComponent, {
            width: "100%",
            maxWidth: "500px",
            data: { parentFolderId: this.id }
        })
    }

    createFolder() {
        this.dialog.open(CreateFolderComponent, {
            width: "100%",
            maxWidth: "500px",
            data: { parentFolderId: this.id }
        })
    }

    renameFolder() {
        this.dialog.open(RenameFolderComponent, {
            width: "100%",
            maxWidth: "500px",
            data: { id: this.id, name: this.name }
        })
    }

    removeFolder() {
        this.dialog.open(RemoveFolderComponent, {
            width: "100%",
            maxWidth: "500px",
            data: {
                id: this.id
            }
        })
    }
}