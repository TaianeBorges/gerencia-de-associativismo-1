import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/alerts/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private formLogin: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.authService.checkAuthorization().subscribe(res => {
      if (res.authenticate) {
        this.router.navigate(['/sites']);
      }
    });

    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.minLength(4), Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required])
    });
  }

  onSubmit(data: any) {
    this.formLogin.markAllAsTouched();
    let alert;

    if (!data.invalid) {
      this.authService.login(data.value).subscribe(res => {
        if (res.authenticate) {
          alert = {
            message: 'Logado com sucesso.',
            title: 'Parabéns!',
            status: 200,
            icon: 'check',
            color: 'success'
          };
          this.authService.storeAuthorizationToken(res.token);
          this.router.navigate(['/sites']);
        } else {
          alert = {
            status: 200,
            message: 'E-mail ou senha inválido.',
            title: 'Ops!',
            icon: 'priority_high',
            color: 'warning'
          };
        }

        this.alertService.alertShow(alert);
      });
    }
  }
}
