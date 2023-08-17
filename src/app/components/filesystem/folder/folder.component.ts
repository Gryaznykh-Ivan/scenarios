import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IFile, IFolder } from 'src/app/models/filesystem.model';
import { RemoveFolderComponent } from '../../popups/remove-folder/remove-folder.component';
import { ConfirmWithNameComponent } from '../../popups/confirm-with-name/confirm-with-name.component';
import { FilesystemService } from 'src/app/services/filesystem.service';

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
        private dialog: MatDialog,
        private filesystemService: FilesystemService
    ) { }

    ngOnInit() { }

    identify(index: number, item: any) {
        return item.id
    }

    createFile() {
        const dialogRef = this.dialog.open(ConfirmWithNameComponent, {
            width: "100%",
            maxWidth: "500px",
            data: {
                title: "Введите название файла",
                YES: "Создать",
                NO: "Отмена"
            }
        })

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return

            this.filesystemService.createFile({ parentFolderId: this.id, name: result.name }).subscribe()
        })
    }

    createFolder() {
        const dialogRef = this.dialog.open(ConfirmWithNameComponent, {
            width: "100%",
            maxWidth: "500px",
            data: {
                title: "Введите название папки",
                YES: "Создать",
                NO: "Отмена"
            }
        })

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return

            this.filesystemService.createFolder({ parentFolderId: this.id, name: result.name }).subscribe()
        })
    }

    renameFolder() {
        const dialogRef = this.dialog.open(ConfirmWithNameComponent, {
            width: "100%",
            maxWidth: "500px",
            data: {
                title: "Введите название папки",
                name: this.name,
                YES: "Сохранить",
                NO: "Отмена"
            }
        })

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return

            this.filesystemService.renameFolder({ id: this.id, name: result.name }).subscribe()
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