import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../shared/alerts/alert.service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    formLogin: FormGroup;
    previousUrl: string;
    captchaResponse: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.formLogin = new FormGroup({
            email: new FormControl('', [Validators.minLength(4), Validators.required]),
            password: new FormControl('', [Validators.minLength(4), Validators.required]),
            captcha: new FormControl('')
        });

        if (!environment.production && !environment.homologation) {
            this.formLogin.get('email').setValue('aapinheiro@firjan.com.br');
            this.formLogin.get('password').setValue('abc*123');
        }

        this.route.queryParams.subscribe(params => {
            if (params && params.url) {
                this.previousUrl = atob(params.url);
            }
        });
    }

    resolved(data) {
        this.formLogin.get('captcha').setValue(data);
    }

    onSubmit(data: any) {
        this.formLogin.markAllAsTouched();
        let alert;

        if (!data.invalid) {
            this.authService.login(data.value).subscribe(res => {
                if (res.authenticate) {
                    alert = {
                        status: 200,
                        icon: 'check_circle',
                        color: 'success',
                        title: 'Parabéns!',
                        message: 'Logado com sucesso.',
                        actions: {
                            close: true
                        }
                    };

                    this.authService.storeAuthorizationToken(res.token);
                    this.authService.storeUser(res);
                    this.authService.authorizationLogin.emit(true);

                    if (this.previousUrl) {
                        this.router.navigate([this.previousUrl]);
                    } else {
                        this.router.navigate(['/']);
                    }
                } else {
                    alert = {
                        status: 200,
                        message: res.message ? res.message : 'E-mail ou senha inválido.',
                        title: 'Ops!',
                        icon: 'priority_high',
                        color: 'warning',
                        actions: {
                            close: true
                        }
                    };

                    this.authService.authorizationLogin.emit(false);

                }

                this.alertService.alertShow(alert);
            });
        }
    }
}
