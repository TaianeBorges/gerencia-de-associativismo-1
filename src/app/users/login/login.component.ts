import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.minLength(4), Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required])
    });
  }

  onSubmit(data) {
    this.formLogin.markAllAsTouched();

    if (!data.invalid) {
      console.log(data.invalid);
    }
  }
}
