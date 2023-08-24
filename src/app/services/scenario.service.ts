import { Injectable, OnDestroy } from '@angular/core';
import {
  Observable,
} from 'rxjs';
import {
  ICreateScenarioRequest,
  ICreateScenarioResponse,
  IGetScenarioRequest,
  IGetScenarioResponse,
  IGetScenariosRequest,
  IGetScenariosResponse,
  IRemoveScenarioRequest,
  IRemoveScenarioResponse
} from '../models/scenarios.model';
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITab } from '../models/tab.model';

@Injectable({
  providedIn: 'root',
})
export class ScenarioService {
  constructor(private http: HttpClient) {}

  getScenarios(data: IGetScenariosRequest): Observable<IGetScenariosResponse> {
    return this.http.get<IGetScenariosResponse>(
      `${environment.BASE_URL}/file/scenarios`,
      {
        params: new HttpParams({
          fromObject: {
            id: data.id,
          },
        }),
      }
    );
  }

  getScenario(data: IGetScenarioRequest): Observable<IGetScenarioResponse> {
    return this.http
      .get<IGetScenarioResponse>(`${environment.BASE_URL}/scenario`, {
        params: new HttpParams({
          fromObject: {
            id: data.id,
          },
        }),
      })
  }

  createScenario(
    data: ICreateScenarioRequest
  ): Observable<ICreateScenarioResponse> {
    return this.http.post<ICreateScenarioResponse>(
      `${environment.BASE_URL}/scenario`,
      {
        name: data.name,
        description: data.description,
      },
      {
        params: new HttpParams({
          fromObject: {
            fileId: data.id,
          },
        }),
      }
    );
  }

  removeScenario(
    data: IRemoveScenarioRequest
  ): Observable<IRemoveScenarioResponse> {
    return this.http.delete<IRemoveScenarioResponse>(
      `${environment.BASE_URL}/scenario`,
      {
        params: new HttpParams({
          fromObject: {
            id: data.id,
          },
        }),
      }
    );
  }
}
