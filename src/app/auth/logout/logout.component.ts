import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.logout();
    }

    logout() {
        let data: any = this.authService.getAuthorizationToken();
        data = data.split('bearer ');
        data = {
            token: data[1]
        };

        return this.authService.logout(data).subscribe(res => {

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            if (res.logout) {
                this.router.navigate(['/login']);
            } else {
                this.router.navigate(['auth/login']);
            }
        }, error => {
            console.log(error);
            if (error.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.authService.authorizationLogin.emit('');
                this.router.navigate(['auth/login']);
            }
        });
    }

}
