import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {Subscription} from 'rxjs';
import {AlertService} from '../../shared/alerts/alert.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

    usersServicesSubscribe: Subscription;
    usersEnableSubscribe: Subscription;
    sendNewPasswordSubscribe: Subscription;
    users = [];
    userActive: boolean;
    optionsPermission = [
        {id: 0, name: 'Desativado'},
        {id: 1, name: 'Ativado'}
    ];
    data = {
        page: 1,
        limit: 40,
        offset: 0,
        total: null
    };

    constructor(
        private usersServices: UsersService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.getUsers(true);
    }

    getUsers($event) {
        if ($event && ((this.users.length < this.data.total) || this.data.total === null)) {
            this.usersServicesSubscribe = this.usersServices.getUsers(this.data).subscribe(res => {
                if (res) {
                    res.data.forEach((item) => {
                        this.users.push(item);
                    });

                    this.data.offset = res.offset;
                    this.data.page = res.page + 1;
                    this.data.total = res.total;
                    this.data.limit = res.limit;
                }
            });
        }
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

    enableUser(value, id) {
        if (confirm('Tem certeza desta operação?')) {
            const data = {
                user_id: id,
                status: !value
            };

            this.usersEnableSubscribe = this.usersServices.enableUser(data).subscribe(res => {
                if (res) {
                    this.users.forEach((element, index) => {
                        if (element.id == res.user.id) {
                            this.users[index].status = res.user.status;
                        }
                    });
                }
            });
        }
    }

    ngOnDestroy() {
        this.usersServicesSubscribe.unsubscribe();

        if (this.sendNewPasswordSubscribe) {
            this.sendNewPasswordSubscribe.unsubscribe();
        }
    }
}
