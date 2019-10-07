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

}
