import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../users.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

    usersServicesSubscribe: Subscription;
    users = [];
    userActive: boolean;
    optionsPermission = [
        {id: 0, name: 'Ativado'},
        {id: 1, name: 'Desativado'}
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

    enableUser(value) {
        console.log(value);
        // console.log(this.userActive);
    }

    ngOnDestroy() {
        this.usersServicesSubscribe.unsubscribe();
    }
}
