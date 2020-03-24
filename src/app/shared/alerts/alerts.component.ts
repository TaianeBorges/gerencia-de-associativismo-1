import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {AlertService} from './alert.service';

import {from, Subscription} from 'rxjs';
import {ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-alerts',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, OnDestroy {

    show: boolean;
    response: any;
    items = [];

    private subscriptionAlertState: Subscription;

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
        this.alertService.alertStateSubject.subscribe(res => {
            this.items = res;
        });
    }

    close(i) {
        this.alertService.hide(i);
    }

    copyError(i) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = JSON.stringify(this.items[i].error);
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);

        this.alertService.hide(i);
    }

    ngOnDestroy() {
        this.subscriptionAlertState.unsubscribe();
    }
}
