import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';
import {UsersService} from '../users.service';
import {AlertService} from '../../shared/alerts/alert.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnChanges, OnDestroy {

  @Input('data') data: any;
  user;
  usersEnableSubscribe: Subscription;
  sendNewPasswordSubscribe: Subscription;

  constructor(
    private alertService: AlertService,
    private usersServices: UsersService
  ) {
  }

  ngOnInit() {
  }

  newPassword(email) {
    if (confirm('Tem certeza desta operação?')) {
      const data = {
        email
      };

      this.sendNewPasswordSubscribe = this.usersServices.sendNewPassword(data).subscribe(res => {

        let alert;

        if (res.send) {

          alert = {
            status: 200,
            icon: 'check_circle',
            color: 'success',
            title: 'Parabéns!',
            message: 'Senha enviada com sucesso!'
          };

        } else {

          alert = {
            status: 200,
            icon: 'priority_high',
            color: 'warning',
            title: 'Atenção!',
            message: 'Não foi possível enviar uma nova senha.',
            actions: {
              close: true
            }
          };
        }

        this.alertService.alertShow(alert);
      });
    }
  }

  enableUser(id) {
    if (confirm('Tem certeza desta operação?')) {
      const data = {id};

      this.usersEnableSubscribe = this.usersServices.enableUser(data).subscribe(res => {
        if (res) {
          this.user.status = res.user.status;
        }
      });
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.data.currentValue) {
      this.user = changes.data.currentValue;
    }
  }

  ngOnDestroy() {
    if (this.sendNewPasswordSubscribe) {
      this.sendNewPasswordSubscribe.unsubscribe();
    }
  }
}
