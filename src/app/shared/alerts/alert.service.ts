import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    alertStateSubject: any = new Subject();
    loaderState = this.alertStateSubject.asObservable();
    timers = [];

    constructor() {
    }

    alertShow(data: any) {

        const time = 5000;

        const id = setTimeout(() => {
            const index = this.getIndex(this.timers, 'id', id);
            this.hide(index);
        }, 5000);

        this.timers.push({
            id,
            time,
            data
        });

        this.alertStateSubject.next(this.timers);
    }

    hide(index) {
        if (!isNaN(index)) {
            if (index !== -1) {
                if (this.timers[index]) {
                    clearTimeout(this.timers[index].id);
                    this.timers.splice(index, 1);
                }
            }
        }
        this.alertStateSubject.next(this.timers);
    }

    stopAll() {

        this.timers.forEach((item, i) => {
            clearTimeout(this.timers[i].id);
        });

        this.timers = [];
        this.alertStateSubject.next(this.timers);
    }

    getIndex(array, attr, value) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
}
