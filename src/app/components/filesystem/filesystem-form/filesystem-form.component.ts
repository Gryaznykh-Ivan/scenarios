import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, finalize, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { IFolder } from 'src/app/models/filesystem.model';
import { ErrorService } from 'src/app/services/error.service';
import { FilesystemService } from 'src/app/services/filesystem.service';

@Component({
    selector: 'app-filesystem-form',
    templateUrl: 'filesystem-form.component.html'
})

export class FilesystemFormComponent implements OnInit {
    isLoading = false
    folder$: Observable<IFolder>
    selectedFileId: number | null = null

    constructor(
        public filesystemService: FilesystemService,
        public errorService: ErrorService,
        public router: Router
    ) { }

    ngOnInit() {
        this.getFolder()
    }

    getFolder() {
        this.isLoading = true

        this.folder$ = this.filesystemService.refetch.pipe(
            switchMap(() => this.filesystemService.getFolder({ id: 0 }).pipe(
                tap(() => this.errorService.clear()),
                finalize(() => this.isLoading = false),
                catchError(error => {
                    this.errorService.handle(error.message)
                    return throwError(() => error.message)
                }),
            ))
        )
    }

    selectFile = (id: number | null) => {
        if (this.selectedFileId === id) {
            this.router.navigateByUrl(`/scenario/${this.selectedFileId}`)
            return
        }

        this.selectedFileId = id
    }
}