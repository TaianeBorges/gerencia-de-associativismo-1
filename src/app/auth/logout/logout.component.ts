import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

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
      if (res.logout) {
        alert('Usuário deslogado com sucesso.');
        this.router.navigate(['/login']);
      } else {
        alert(`Ocorreu o seguinte erro: ${res.message}`);
        this.router.navigate(['auth/login']);
      }
    });
  }

}
