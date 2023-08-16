import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RenameFileComponent } from '../../popups/rename-file/rename-file.component';
import { ConfirmComponent } from '../../popups/confirm/confirm.component';
import { FilesystemService } from 'src/app/services/filesystem.service';
import { IFile } from 'src/app/models/filesystem.model';

@Component({
    selector: 'app-file',
    templateUrl: 'file.component.html'
})

export class FileComponent implements OnInit {
    @Input() id: number;
    @Input() name: string;
    @Input() selectFile: (data: IFile) => void

    constructor(private dialog: MatDialog, private filesystemService: FilesystemService) { }

    ngOnInit() { }
    
    identify(index: number, item: any) {
        return item.id
    }

    renameFile() {
        this.dialog.open(RenameFileComponent, {
            width: "100%",
            maxWidth: "500px",
            data: { id: this.id, name: this.name }
        })
    }

    removeFile(){
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: "100%",
            maxWidth: "500px",
            data: {
                title: "Вы уверены?",
                message: "Модель будет удалена",
                YES: "Да",
                NO: "Нет"
            }
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result !== true) return

            this.filesystemService.removeFile({ id: this.id }).subscribe()
        })
    }
}