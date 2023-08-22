import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IFile, IFolder } from 'src/app/models/filesystem.model';
import { ConfirmWithNameComponent } from '../../popups/confirm-with-name/confirm-with-name.component';
import { ConfirmComponent } from '../../popups/confirm/confirm.component';
import { ConfirmWithCheckboxComponent } from '../../popups/confirm-with-checkbox/confirm-with-checkbox.component';
import { Store } from '@ngrx/store';
import {
  createFileInitiated,
  createFolderInitiated,
  isFolderExistInitiated,
  removeFolderInitiated,
  renameFolderInitiated,
} from 'src/app/state/filesystem';
import { FilesystemService } from 'src/app/services/filesystem.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-folder',
  templateUrl: 'folder.component.html',
})
export class FolderComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() files: IFile[];
  @Input() childFolders: IFolder[];
  @Input() selectedFileId: number | null;
  @Input() selectFile: (data: IFile) => void;
  @Input() isRevealed = false;
  @Input() isMainFolder = false;

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private filesystemService: FilesystemService
  ) {}

  ngOnInit() {}

  identify(index: number, item: any) {
    return item.id;
  }

  createFile() {
    const dialogRef = this.dialog.open(ConfirmWithNameComponent, {
      width: '100%',
      maxWidth: '500px',
      data: {
        title: 'Введите название файла',
        YES: 'Создать',
        NO: 'Отмена',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.store.dispatch(
        createFileInitiated({ parentFolderId: this.id, name: result.name })
      );
    });
  }

  createFolder() {
    const dialogRef = this.dialog.open(ConfirmWithNameComponent, {
      width: '100%',
      maxWidth: '500px',
      data: {
        title: 'Введите название папки',
        YES: 'Создать',
        NO: 'Отмена',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.store.dispatch(
        createFolderInitiated({ parentFolderId: this.id, name: result.name })
      );
    });
  }

  renameFolder() {
    const dialogRef = this.dialog.open(ConfirmWithNameComponent, {
      width: '100%',
      maxWidth: '500px',
      data: {
        title: 'Введите название папки',
        name: this.name,
        YES: 'Сохранить',
        NO: 'Отмена',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.store.dispatch(
        renameFolderInitiated({ id: this.id, name: result.name })
      );
    });
  }

  async removeFolder() {
    const isFolderEmpty = await firstValueFrom(
      this.filesystemService.isFolderEmpty({ id: this.id })
    );

    if (isFolderEmpty === false) {
      this.dialog
        .open(ConfirmWithCheckboxComponent, {
          width: '100%',
          maxWidth: '500px',
          data: {
            title: 'Вы уверены?',
            message: 'Папка будет удалена?',
            checkedLabel: 'Удалить вложенные папки и файлы',
            checked: true,
            YES: 'Удалить',
            NO: 'Отмена',
          },
        })
        .afterClosed()
        .subscribe((result) => {
          if (!result) return;

          this.store.dispatch(
            removeFolderInitiated({ id: this.id, cascade: result.checked })
          );
        });

      return;
    }

    this.dialog
      .open(ConfirmComponent, {
        width: '100%',
        maxWidth: '500px',
        data: {
          title: 'Вы уверены?',
          message: 'Папка будет удалена?',
          YES: 'Удалить',
          NO: 'Отмена',
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result !== true) return;

        this.store.dispatch(
          removeFolderInitiated({ id: this.id, cascade: true })
        );
      });
  }
}
