import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth.service';
import {AlertService} from '../../shared/alerts/alert.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit, OnDestroy {

    formEmail: FormGroup;
    formPasswordReset: FormGroup;
    token = {
        valid: false,
        value: ''
    };
    feedbackMessage = false;
    linkPasswordResetService: Subscription;
    validatePasswordTokenService: Subscription;
    setNewPasswordService: Subscription;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router
    ) {
        this.formEmail = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.formPasswordReset = this.fb.group({
            newPwd: ['', [Validators.required, Validators.minLength(6)]],
            confirmPwd: ['', [Validators.required, Validators.minLength(6)]]
        });

        this.route.queryParams.subscribe(params => {
            this.token.value = params.token;
        });
    }

    ngOnInit() {
        if (this.token.value) {
            this.checkToken(this.token.value);
        }

    }

    validateMatchValues() {
        if (this.formPasswordReset.get('newPwd').value !== this.formPasswordReset.get('confirmPwd').value) {
            this.formPasswordReset.get('confirmPwd').setErrors({matchValues: true});
        } else {
            this.formPasswordReset.get('confirmPwd').setErrors(null);
        }
    }

    onSubmitEmail() {
        this.formEmail.markAllAsTouched();
        let alert;

        if (this.formEmail.valid) {
            this.linkPasswordResetService = this.authService.linkPasswordReset(this.formEmail.value).subscribe(res => {
                console.log(res);

                if (!res.submit) {
                    alert = {
                        status: 200,
                        message: res.message,
                        title: 'Ops!',
                        icon: 'priority_high',
                        color: 'warning',
                        actions: {
                            close: true
                        }
                    };
                } else {
                    alert = {
                        status: 200,
                        icon: 'check_circle',
                        color: 'success',
                        title: 'Parabéns!',
                        message: res.message,
                        actions: {
                            close: true
                        }
                    };

                    this.feedbackMessage = true;
                    this.formEmail.reset();
                }

                this.alertService.alertShow(alert);
            });
        }
    }

    onSubmitPassword() {
        this.formPasswordReset.markAllAsTouched();
        this.validateMatchValues();

        if (this.formPasswordReset.valid) {
            let alert;

            const data = {
                token: this.token.value,
                newPwd: this.formPasswordReset.value.newPwd
            };

            this.authService.setNewPassword(data).subscribe(res => {
                if (!res.reset) {
                    alert = {
                        status: 200,
                        message: res.message,
                        title: 'Ops!',
                        icon: 'priority_high',
                        color: 'warning',
                        actions: {
                            close: true
                        }
                    };

                    this.alertService.alertShow(alert);

                } else {

                    alert = {
                        status: 200,
                        icon: 'check_circle',
                        color: 'success',
                        title: 'Parabéns!',
                        message: res.message,
                        actions: {
                            close: true
                        }
                    };
                }

                this.formPasswordReset.reset();

                this.alertService.alertShow(alert);

                this.router.navigate(['/login']);
            });
        }
    }

    checkToken(token: string) {
        let alert;

        this.validatePasswordTokenService = this.authService.validatePasswordToken({token}).subscribe(res => {
            if (res) {

                if (!res.token) {
                    alert = {
                        status: 200,
                        message: res.message,
                        title: 'Ops!',
                        icon: 'priority_high',
                        color: 'warning',
                        actions: {
                            close: true
                        }
                    };

                    this.alertService.alertShow(alert);
                } else {
                    this.token.valid = true;
                }
            }

        });
    }

    ngOnDestroy() {
        if (this.linkPasswordResetService) {
            this.linkPasswordResetService.unsubscribe();
        }
        if (this.validatePasswordTokenService) {
            this.validatePasswordTokenService.unsubscribe();
        }
        if (this.setNewPasswordService) {
            this.setNewPasswordService.unsubscribe();
        }
    }


}
