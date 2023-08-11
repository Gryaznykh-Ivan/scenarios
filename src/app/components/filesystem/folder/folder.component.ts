import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IFile, IFolder } from 'src/app/models/filesystem.model';
import { CreateFileComponent } from '../../popups/create-file/create-file.component';

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

    constructor(
        private dialog: MatDialog
    ) { }

    ngOnInit() { }

    identify(index: number, item: any) {
        return item.id
    }

    openModal() {
        const dialogRef = this.dialog.open(CreateFileComponent, {
            width: "100%",
            maxWidth: "500px",
            data: { parentFolderId: this.id }
        })
        dialogRef.afterClosed().subscribe({
            next: (values) => {
                if (values) {
                    console.log(values)
                }
            },
        });
    }
}