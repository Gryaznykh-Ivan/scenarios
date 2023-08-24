import {
  HttpClient
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAction, IActionGroup } from '../models/action.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  constructor(private http: HttpClient) {}

  getActions() {
    return this.http.get<IAction[]>(`${environment.BASE_URL}/action`)
  }

  getGroupedActions() {
    return this.http
      .get<IActionGroup[]>(`${environment.BASE_URL}/action/group`)
  }
}
