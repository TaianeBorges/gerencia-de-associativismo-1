import { Component, OnInit, ViewChild, Input, ViewEncapsulation, ViewRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import * as jQuery from 'jquery';
import { callbackify } from 'util';
import { AlertService } from 'src/app/shared/alerts/alert.service';
import { AuthService } from 'src/app/auth/auth.service';

declare const $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  private formRegister: any;
  unidadeSelect: any;
  selectRegional: any;
  selectCargo: any;
  permissionOffice = true;
  @ViewChild('selectizeSector', { static: false }) selectizeSector;

  configRegional = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    maxItems: 20,
    onChange: ($event: any) => {
      // this.getUnions($event);
    },
    onBlur: () => {
    }
  };

  configSyndicates = {
    labelField: 'initial',
    valueField: 'id',
    create: false,
    searchField: ['name', 'initial'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    maxItems: 200
  };

  permissionManagements = true;

  configSyndicateSectors = {
    labelField: 'name',
    valueField: 'id',
    create: false,
    searchField: ['name'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'up',
    maxItems: 200,
    onBlur: () => {
      if (this.selectizeSector.value.length)
        this.getSyndicatesBySectors(this.selectizeSector.value);
    }
  };

  configManagement = {
    labelField: 'initial',
    valueField: 'id',
    create: false,
    searchField: ['name', 'initial'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    maxItems: 200,
    onBlur: () => {
      this.getDepartments();
    },
    onChange: ($event: any) => {
      this.permissionManagements = !($event.length > 1);
    },
    render: {
      option(data: any, escape: any) {
        return '<div class="option">' +
          '<span class="initial"><b>' + escape(data.initial) + '</b></span>' +
          '<span class="name"> - ' + escape(data.name) + '</span>' +
          '</div>';
      },
      item(data: any, escape: any) {
        return '<div class="item">' + escape(data.initial) + '</div>';
      }
    }
  };

  configSyndicatesSectors = {
    labelField: 'name',
    valueField: 'id',
    create: false,
    searchField: ['name'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'up',
    maxItems: 200,
    onBlur: () => {
      if (this.selectizeSector.value.length)
        this.getSyndicatesBySectors(this.selectizeSector.value);
    }
  };

  optionsSectorGroup = [];
  optionsCapacity = [];
  optionRegional = [];
  optionManagement = [];
  optionDepartments = [];
  optionsSyndicates = [];
  optionsSyndicatesSectors = [];

  optionCargos = [
    { id: 1, nome: 'Gerente' },
    { id: 2, nome: 'Coordenador' },
    { id: 3, nome: 'Executivo' }
  ];
  cargos = [];
  optionGeneralManagement = [];

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {

    this.formRegister = this.fb.group({
      name: new FormControl('', [Validators.minLength(4), Validators.required]),
      email: new FormControl('', [Validators.minLength(4), Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.minLength(14), Validators.required]),
      capacity_id: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.minLength(4), Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
      confirmPassword: new FormControl('', [Validators.minLength(4), Validators.required]),
      general_management_id: new FormControl('', [Validators.required]),
      management_id: new FormControl(''),
      department_id: new FormControl(''),
      relationship: this.fb.group({
        check_relationship: false,
        check_industry_relationship: false,
        regionals: [],
        syndicates: [],
        syndicates_sectors: []
      }),
      cargos: [],
      representante_regional: this.fb.group({
        regional: '',
        cargo: ''
      })
    });

    if (this.formRegister) {
      this.getCapacities();
      this.getRegionals();
    }
  }

  addOffice(data: any) {

    const reg = this.optionRegional[data[0] - 1];
    const carg = this.optionCargos[data[1] - 1];

    this.cargos.push({
      regional: {
        id: reg.id,
        nome: reg.nome,
      },
      cargo: {
        id: carg.id,
        nome: carg.nome
      }
    });

    this.formRegister.get('cargos').patchValue(this.cargos);

    this.selectCargo = '';
    this.selectRegional = '';

    this.permissionOffice = !(carg.nome === 'Executivo');
  }

  trackByFn(index, item) {
    return (item.id);
  }

  removeOffice(i: number) {
    this.cargos.splice(i, 1);

    this.permissionOffice = !!(this.optionCargos.length);
  }

  matchValues(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    const validation = password !== confirmPassword ? { confirmPass: true } : confirmPassword.length < 4 ? { minLength: true } : null;

    return this.formRegister.get('confirmPassword').setErrors(validation);
  }

  onSubmit(data: FormGroup) {
    this.formRegister.markAllAsTouched();
    this.validateRepresentanteRegional();
    this.validateSede();
    let dataAlert = {};

    if (data.valid) {
      this.userService.registerUser(data.value).subscribe(res => {
        if (!res.status) {
          dataAlert = {
            status: 200,
            icon: 'check_circle',
            color: 'success',
            title: 'Parabéns!',
            message: 'Cadastrado com sucesso.',
            copy: false
          };

          this.formRegister.reset();
          // this.authService.storeAuthorizationToken(res.token);

          this.alertService.alertShow(dataAlert);

          this.router.navigate(['/auth/login']);

          setTimeout(() => {
            this.alertService.hide();
          }, 1000);
        }
      });
    }
  }

  getCapacities() {
    this.userService.getCapacities().subscribe(res => {
      if (res.data) {
        this.optionsCapacity = res.data;
      }
    });
  }

  getGeneralManagement() {
    const id = this.formRegister.get('capacity_id').value;
    if (id && this.optionsCapacity[id - 1].nome !== 'Representante Regional') {
      this.userService.getGeneralManagement(id).subscribe(res => {
        if (res.data) {
          this.optionGeneralManagement = res.data;

          if (res.data.length === 1) {
            this.formRegister.get('general_management_id').setValue(res.data[0].id);
            this.getManagements();
          }
        }
      });
    } else {
      this.formRegister.get('general_management_id').clearValidators();
      this.formRegister.get('general_management_id').updateValueAndValidity();
    }
  }

  getSectors() {
    const id = this.formRegister.get('capacity_id').value;
    if (id && this.optionsCapacity[id - 1].nome !== 'Representante Regional') {
      this.userService.getSectorsService().subscribe(res => {
        this.optionsSyndicatesSectors = res.data;
      });
    }
  };

  getManagements() {
    const data = {
      capacity_id: this.formRegister.get('capacity_id').value,
      general_management_id: this.formRegister.get('general_management_id').value
    };

    if (data.capacity_id && data.general_management_id) {
      this.userService.getManagements(data).subscribe(res => {
        if (res.data) {
          this.optionManagement = res.data;

          if (res.data.length === 1) {
            setTimeout(() => {
              this.formRegister.get('management_id').setValue(res.data[0].id);

              if (this.formRegister.get('management_id').value && this.formRegister.get('management_id').value.length === 1) {
                this.permissionManagements = true;
                this.getDepartments();
              }
            }, 500);
          }
        }
      });
    }
  }

  getRegionals() {
    this.userService.getRegionals().subscribe(res => {
      if (res.data) {
        this.optionRegional = res.data;
      }
    });
  }

  getDepartments() {
    const data = {
      capacity_id: this.formRegister.get('capacity_id').value,
      general_management_id: this.formRegister.get('general_management_id').value,
      management_id: this.formRegister.get('management_id').value
    };

    console.log(this.formRegister.value);

    if (data.capacity_id && data.general_management_id && this.formRegister.get('management_id').value.length === 1) {
      this.cargos = [];

      this.userService.getDepartments(data).subscribe(res => {
        if (res.data) {
          this.optionDepartments = res.data;
          if (res.data.length === 1) {
            this.formRegister.get('department_id').setValue(res.data[0].id);
          }
        }
      });
    }
  }

  getSyndicatesBySectors(sectors) {
    const data = {
      syndicates_sectors: sectors
    };

    let filter = [];

    this.userService.getSyndicatesBySectors(data).subscribe(res => {

      if (res) {
        this.optionsSyndicates = res.data;

        for (let item of res.data) {
          filter.push(item.id);
        }

        if (res.data.length)
          setTimeout(() => {
            this.formRegister.get('relationship.syndicates').setValue(filter);
          }, 1000);
      }
    });
  }

  validateRepresentanteRegional() {
    const representanteRegional = this.formRegister.get('representante_regional.regional');
    const regionalId = this.formRegister.get('capacity_id').value;
    const representanteCargo = this.formRegister.get('representante_regional.cargo');
    const validateRegional = regionalId && regionalId !== '1';

    if (validateRegional && !representanteRegional.value && !this.cargos.length) {
      representanteRegional.setErrors({ required: true });
    } else if (representanteRegional) {
      representanteRegional.clearValidators();
      representanteRegional.updateValueAndValidity();
    }

    if (validateRegional && !representanteCargo.value && !this.cargos.length) {
      representanteCargo.setErrors({ required: true });
    } else if (representanteRegional) {
      representanteCargo.clearValidators();
      representanteCargo.updateValueAndValidity();
    }

    if (representanteCargo.value && representanteRegional.value && !this.cargos.length) {
      alert('Adicione os cargos!');
    }
  }

  validateSede() {
    const check_relationship = this.formRegister.get('relationship.check_relationship');
    const relationship_regionals = this.formRegister.get('relationship.regionais');
    const relationship_syndicates = this.formRegister.get('relationship.syndicates');
    const capacity_id = this.formRegister.get('capacity_id');
    const depatment_id = this.formRegister.get('department_id');
    const management_id = this.formRegister.get('management_id');

    if (capacity_id.value && capacity_id.value === '1' && !management_id.value.length) {
      management_id.setErrors({ required: true });
    } else {
      management_id.updateValueAndValidity();
    }

    if (capacity_id.value && capacity_id.value === '1' && !depatment_id.value) {
      depatment_id.setErrors({ required: true });
    } else {
      depatment_id.updateValueAndValidity();
    }

    if (check_relationship.value && !relationship_regionals.value) {
      alert('Adicione as regionais');
      relationship_regionals.setErrors({ required: true });
    } else {
      relationship_regionals.updateValueAndValidity();
    }

    if (check_relationship.value && !relationship_syndicates.value) {
      relationship_syndicates.setErrors({ required: true });
      alert('Adicione os sindicatos');
    } else {
      relationship_syndicates.updateValueAndValidity();
    }
  }
}
