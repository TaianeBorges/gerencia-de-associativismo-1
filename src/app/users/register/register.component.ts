import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private formRegister: any;
  config = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    optionGroups: null
  };
  options = [
    { id: 1, name: 'Teste' }
  ];
  constructor() { }

  ngOnInit() {
    if (typeof jQuery != 'undefined') {
      // jQuery is loaded => print the version
      alert(jQuery.fn.jquery);
    } else {
      // jQuery was not loaded
      console.error("No jquery");
    }
    this.formRegister = new FormGroup({
      name: new FormControl('', [Validators.minLength(4), Validators.required]),
      email: new FormControl('', [Validators.minLength(4), Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.minLength(14), Validators.required]),
      unidade: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.minLength(4), Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
      confirmPassword: new FormControl('', [Validators.minLength(4), Validators.required]),
      divisao: new FormControl('', [Validators.required])
    });
  }

  matchValues(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    const validation = password !== confirmPassword ? { confirmPass: true } : confirmPassword.length < 4 ? { minLength: true } : null;

    return this.formRegister.get('confirmPassword').setErrors(validation);
  }
}
