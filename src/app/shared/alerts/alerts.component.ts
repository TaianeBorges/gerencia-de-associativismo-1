import {Component, OnInit, OnDestroy, ElementRef, Renderer2} from '@angular/core';
import {AlertService} from './alert.service';
import {Subscription} from 'rxjs';
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

    subscriptionAlertState: Subscription;

    constructor(private alertService: AlertService, private elem: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.alertService.alertStateSubject.subscribe(res => {
            this.items = res;
        });
    }

    close(i) {

        const element = this.elem.nativeElement.querySelector(`.alert-item-${i}`);

        if (element) {
            this.renderer.addClass(element, `fadeOutRight`);
        }

        setTimeout(() => {
            this.alertService.hide(i);
        }, 800);
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
        if (this.subscriptionAlertState) {
            this.subscriptionAlertState.unsubscribe();
        }
    }
}
