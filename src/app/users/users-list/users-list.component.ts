import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

    usersServicesSubscribe: Subscription;
    usersEnableSubscribe: Subscription;
    users = [];
    userActive: boolean;
    optionsPermission = [
        {id: 0, name: 'Desativado'},
        {id: 1, name: 'Ativado'}
    ];
    data = {
        page: 1,
        limit: 20,
        offset: 0,
        total: null
    };

    constructor(private usersServices: UsersService) {
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
    }
}
