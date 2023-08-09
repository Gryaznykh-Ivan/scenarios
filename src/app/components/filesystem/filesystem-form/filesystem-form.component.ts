import { Component, OnInit } from '@angular/core';
import { catchError, delay, Observable, tap, throwError } from 'rxjs';
import { IFolder } from 'src/app/models/filesystem.model';
import { FilesystemService } from 'src/app/services/filesystem.service';

@Component({
    selector: 'app-filesystem-form',
    templateUrl: 'filesystem-form.component.html'
})

export class FilesystemFormComponent implements OnInit {
    folder$: Observable<IFolder>
    isLoading = false
    error = ""

    constructor(
        public filesystemService: FilesystemService
    ) { }

    ngOnInit() {
        this.isLoading = true

        this.folder$ = this.filesystemService.getFolder({ id: 0 }).pipe(
            delay(2000),
            tap(() => this.isLoading = false),
            catchError(error => {
                this.isLoading = false
                this.error = error.message

                return throwError(() => error.message)
            })
        )
    }
}