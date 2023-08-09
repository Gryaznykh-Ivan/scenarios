import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFolder } from '../models/filesystem.model';

@Injectable({ providedIn: 'root' })
export class FilesystemService {
    constructor(
        private http: HttpClient
    ) { }

    getFolder(data: Pick<IFolder, "id">): Observable<IFolder> {
        return this.http.get<IFolder>(`${environment.BASE_URL}/folder`, {
            params: new HttpParams({
                fromObject: {
                    id: data.id
                }
            })
        })
    }
}