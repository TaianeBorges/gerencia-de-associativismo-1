import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertStateSubject = new Subject();
  loaderState = this.alertStateSubject.asObservable();
  alertSetTimeout;

  constructor() { }

  alertShow(data: any) {
    this.alertStateSubject.next({ show: true, data });

    if (!this.alertSetTimeout) {
      this.alertSetTimeout = setTimeout(() => { this.hide(); }, 10000);
    } else {
      clearTimeout(this.alertSetTimeout);
      this.alertSetTimeout = setTimeout(() => {
        this.hide();
      }, 10000);
    }
  }

  hide() {
    const data = {};
    this.alertStateSubject.next({ show: false, data });
  }
}