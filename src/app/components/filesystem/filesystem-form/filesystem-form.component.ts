import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  catchError,
  delay,
  finalize,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { IFolder } from 'src/app/models/filesystem.model';
import { ErrorService } from 'src/app/services/error.service';
import { FilesystemService } from 'src/app/services/filesystem.service';

@Component({
  selector: 'app-filesystem-form',
  templateUrl: 'filesystem-form.component.html',
})
export class FilesystemFormComponent implements OnInit {
  isLoading = false;
  folder$: Observable<IFolder>;

  constructor(
    public filesystemService: FilesystemService,
    public errorService: ErrorService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getFolder();
  }

  getFolder() {
    this.isLoading = true;

    this.folder$ = this.filesystemService.refetch.pipe(
      switchMap(() =>
        this.filesystemService
          .getFolder({ id: 0 })
          .pipe(finalize(() => (this.isLoading = false)))
      )
    );
  }

  selectFile = (id: number) => {
    this.router.navigateByUrl(`/scenario/${id}`);
  };
}
