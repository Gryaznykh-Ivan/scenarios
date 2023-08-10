import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IModal } from '../models/modal.model';

@Injectable({ providedIn: 'root' })
export class ModalService {
  modal$ = new BehaviorSubject<IModal>({
    isShown: false,
    type: null,
    data: undefined
  })

  open(type: string, data: unknown) {
    this.modal$.next({ isShown: true, type, data })
  }

  close() {
    this.modal$.next({ isShown: false, type: null, data: undefined })
  }
}
