import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    alertStateSubject: any = new Subject();
    loaderState = this.alertStateSubject.asObservable();
    messages = [];

    constructor() {
    }

    alertShow(data: any) {
        this.messages.push(data);
        this.alertStateSubject.next(this.messages);

        if (this.messages.length) {
            setTimeout(() => {
                this.hide(0);
            }, 10000);
        }
    }

    hide(i) {
        this.messages.splice(i, 1);
        this.alertStateSubject.next(this.messages);
    }
}
