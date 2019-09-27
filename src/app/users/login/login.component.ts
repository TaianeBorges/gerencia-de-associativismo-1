import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { LoginService } from './login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.minLength(4), Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required])
    });
  }

  onSubmit(data) {
    this.formLogin.markAllAsTouched();

    if (!data.invalid) {
      this.loginService.login(data.value).subscribe(res => {
        if (res) {
          this.authService.storeAuthorizationToken(res.token);
        }
      });
    }
  }
}
