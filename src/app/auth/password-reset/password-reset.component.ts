import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  formEmail: FormGroup;
  formPasswordReset: FormGroup;
  token = {
    valid: false,
    value: ""
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute 
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
    
    if (this.formEmail.valid) {
      console.log('foi');
    }
  }

  onSubmitPassword() {
    this.formPasswordReset.markAllAsTouched();
    this.validateMatchValues();
    
    if (this.formPasswordReset.valid) {
      console.log('foi a senha');
    } 
  }

}
