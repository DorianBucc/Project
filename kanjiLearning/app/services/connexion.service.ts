import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  public _isConnect = new BehaviorSubject<number>(0);
  isConnect = this._isConnect.asObservable();

  constructor() { this.setConnection(0)}

  setConnection(status:number) {
    this._isConnect.next(status);
  }
}
