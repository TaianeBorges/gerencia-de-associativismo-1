import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    usersServicesSubscribe: Subscription;
    usersEnableSubscribe: Subscription;
    users = [];
    userActive: boolean;
    optionsPermission = [
        { id: 0, name: 'Desativado' },
        { id: 1, name: 'Ativado' }
    ];

    constructor(private usersServices: UsersService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.usersServicesSubscribe = this.usersServices.getUsers().subscribe(res => {
            if (res) {
                this.users = res.data;
            }
        });
    }

    enableUser(value, id) {
        if (confirm('Tem certeza desta operação?')) {
            const data = {
                user_id: id,
                active: !value
            }

            this.usersEnableSubscribe = this.usersServices.enableUser(data).subscribe(res => {
                if (res) {
                    this.users.forEach((element, index) => {
                        if (element.id == res.user.id) {
                            this.users[index].active = res.user.active;
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
