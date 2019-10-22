import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AlertService } from './alert.service';

import { from, Subscription } from 'rxjs';
@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, OnDestroy {

  show: boolean;
  response: any;

  private subscriptionAlertState: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.alertStateSubject.subscribe(res => {
      this.response = res;
      this.show = res.show;
    });
  }

  close() {
    this.alertService.hide();
  }

  ngOnDestroy() {
    this.subscriptionAlertState.unsubscribe();
  }

  copyError() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = JSON.stringify(this.response.data.error);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.alertService.hide();
  }

}
