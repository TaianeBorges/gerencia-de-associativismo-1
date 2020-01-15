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

  configSindicato = {
    labelField: 'sigla',
    valueField: 'id',
    create: false,
    searchField: ['nome', 'sigla'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    maxItems: 200
  };

  permissionManagements = true;

  configUnionsSectors = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'up',
    maxItems: 200,
    onBlur: () => {
      if (this.selectizeSector.value.length)
        this.getUnionsBySectors(this.selectizeSector.value);
    }
  };

  configManagement = {
    labelField: 'sigla',
    valueField: 'id',
    create: false,
    searchField: ['nome', 'sigla'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    maxItems: 200,
    onBlur: () => {
      this.getDivisions();
    },
    onChange: ($event: any) => {
      this.permissionManagements = !($event.length > 1);
    },
    render: {
      option(data: any, escape: any) {
        return '<div class="option">' +
          '<span class="sigla"><b>' + escape(data.sigla) + '</b></span>' +
          '<span class="nome"> - ' + escape(data.nome) + '</span>' +
          '</div>';
      },
      item(data: any, escape: any) {
        return '<div class="item">' + escape(data.sigla) + '</div>';
      }
    }
  };


  optionLotacao = [];
  optionRegional = [];
  optionManagement = [];
  optionDivisions = [];
  optionsSindicatos = [];
  getSectors = [];
  optionsUnionsSectors = [];

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
      lotacao_id: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.minLength(4), Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
      confirmPassword: new FormControl('', [Validators.minLength(4), Validators.required]),
      gerencia_geral_id: new FormControl('', [Validators.required]),
      gerencia_id: new FormControl(''),
      divisao_id: new FormControl(''),
      relacionamento: this.fb.group({
        check_relacionamento: false,
        check_relacionamento_setorial: false,
        regionais: [],
        sindicatos: [],
        setores_sindicato: []
      }),
      cargos: [],
      representante_regional: this.fb.group({
        regional: '',
        cargo: ''
      })
    });

    if (this.formRegister) {
      this.getLotacoes();
      this.getRegionals();
    }
  }

  addOffice(data: any) {

    // console.log({
    //   'teste1': data,
    //   'teste2': this.optionCargos,
    //   'teste3': this.cargos
    // });

    console.log(this.cargos);
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

  getLotacoes() {
    this.userService.getLotacoes().subscribe(res => {
      if (res.data) {
        this.optionLotacao = res.data;
      }
    });
  }

  getGeneralManagement() {
    const id = this.formRegister.get('lotacao_id').value;
    if (id && this.optionLotacao[id - 1].nome !== 'Representante Regional') {
      this.userService.getGeneralManagement(id).subscribe(res => {
        if (res.data) {
          this.optionGeneralManagement = res.data;

          if (res.data.length === 1) {
            this.formRegister.get('gerencia_geral_id').setValue(res.data[0].id);
            this.getManagements();
          }
        }
      });
    } else {
      this.formRegister.get('gerencia_geral_id').clearValidators();
      this.formRegister.get('gerencia_geral_id').updateValueAndValidity();
    }
  }

  getSector() {
    const id = this.formRegister.get('lotacao_id').value;
    if (id && this.optionLotacao[id - 1].nome !== 'Representante Regional') {
      this.userService.getSectors().subscribe(res => {
        this.optionsUnionsSectors = res.data;
      });
    }
  };

  getManagements() {
    const data = {
      lotacao_id: this.formRegister.get('lotacao_id').value,
      general_management_id: this.formRegister.get('gerencia_geral_id').value
    };

    if (data.lotacao_id && data.general_management_id) {
      this.userService.getManagements(data).subscribe(res => {
        if (res.data) {
          this.optionManagement = res.data;

          if (res.data.length === 1) {
            setTimeout(() => {
              this.formRegister.get('gerencia_id').setValue(res.data[0].id);

              if (this.formRegister.get('gerencia_id').value && this.formRegister.get('gerencia_id').value.length === 1) {
                this.permissionManagements = true;
                this.getDivisions();
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

  getDivisions() {
    const data = {
      lotacao_id: this.formRegister.get('lotacao_id').value,
      general_management_id: this.formRegister.get('gerencia_geral_id').value,
      general_id: this.formRegister.get('gerencia_id').value
    };

    if (data.lotacao_id && data.general_management_id && this.formRegister.get('gerencia_id').value.length === 1) {
      this.cargos = [];

      this.userService.getDivisions(data).subscribe(res => {
        if (res.data) {
          this.optionDivisions = res.data;
          if (res.data.length === 1) {
            this.formRegister.get('divisao_id').setValue(res.data[0].id);
          }
        }
      });
    }
  }

  getUnionsBySectors(sectors) {
    const data = {
      setores_sindicato: sectors
    };

    let filter = [];

    this.userService.getUnionsBySectors(data).subscribe(res => {

      if (res) {
        this.optionsSindicatos = res.data;

        for (let item of res.data) {
          filter.push(item.id);
        }

        if (res.data.length)
          setTimeout(() => {
            this.formRegister.get('relacionamento.sindicatos').setValue(filter);
          }, 1000);
      }
    });
  }

  validateRepresentanteRegional() {
    const representanteRegional = this.formRegister.get('representante_regional.regional');
    const regionalId = this.formRegister.get('lotacao_id').value;
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
    const checkRelacionamento = this.formRegister.get('relacionamento.check_relacionamento');
    const relacionamentoRegionais = this.formRegister.get('relacionamento.regionais');
    const relacionamentoSindicatos = this.formRegister.get('relacionamento.sindicatos');
    const lotacaoId = this.formRegister.get('lotacao_id');
    const divisaoId = this.formRegister.get('divisao_id');
    const gerenciaId = this.formRegister.get('gerencia_id');

    if (lotacaoId.value && lotacaoId.value === '1' && !gerenciaId.value.length) {
      gerenciaId.setErrors({ required: true });
    } else {
      gerenciaId.updateValueAndValidity();
    }

    if (lotacaoId.value && lotacaoId.value === '1' && !divisaoId.value) {
      divisaoId.setErrors({ required: true });
    } else {
      divisaoId.updateValueAndValidity();
    }

    if (checkRelacionamento.value && !relacionamentoRegionais.value) {
      alert('Adicione as regionais');
      relacionamentoRegionais.setErrors({ required: true });
    } else {
      relacionamentoRegionais.updateValueAndValidity();
    }

    if (checkRelacionamento.value && !relacionamentoSindicatos.value) {
      relacionamentoSindicatos.setErrors({ required: true });
      alert('Adicione os sindicatos');
    } else {
      relacionamentoSindicatos.updateValueAndValidity();
    }
  }
}
