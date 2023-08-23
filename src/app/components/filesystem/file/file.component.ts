import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../popups/confirm/confirm.component';
import { IFile } from 'src/app/models/filesystem.model';
import { ConfirmWithNameComponent } from '../../popups/confirm-with-name/confirm-with-name.component';
import { IConfirmWithName } from 'src/app/models/confirm.model';
import { Store } from '@ngrx/store';
import { removeFileInitiated, renameFileInitiated } from 'src/app/state/filesystem';

@Component({
    selector: 'app-file',
    templateUrl: 'file.component.html'
})

export class FileComponent implements OnInit {
    @Input() id: number;
    @Input() name: string;
    @Input() selectFile: (data: IFile) => void

    constructor(private dialog: MatDialog, private store: Store) { }

    ngOnInit() { }
    
    identify(index: number, item: any) {
        return item.id
    }

    renameFile() {
        const dialogRef = this.dialog.open(ConfirmWithNameComponent, {
            width: "100%",
            maxWidth: "500px",
            data: {
                title: "Введите название файла",
                name: this.name,
                YES: "Сохранить",
                NO: "Отмена"
            }
        })

        dialogRef.afterClosed().subscribe(result => {
            if (!result) return

            this.store.dispatch(renameFileInitiated({ payload: {id: this.id, name: result.name} }))
        })
    }

    removeFile(){
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: "100%",
            maxWidth: "500px",
            data: {
                title: "Вы уверены?",
                message: "Файл будет удален",
                YES: "Да",
                NO: "Нет"
            }
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result !== true) return

            this.store.dispatch(removeFileInitiated({ payload: {id: this.id} }))
        })
    }
}