import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
    private router: Router
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

    if (!data.invalid) {
      this.authService.login(data.value).subscribe(res => {
        if (res.authenticate) {
          this.authService.storeAuthorizationToken(res.token);
          this.router.navigate(['/sites']);
        }

        alert(`${res.message}`);
      });
    }
  }
}
