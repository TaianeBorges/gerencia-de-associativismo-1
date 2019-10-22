import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from '../users.service';
import * as jQuery from 'jquery';
import { callbackify } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private formRegister: any;
  unidadeSelect;
  selectRegional;
  selectCargo;
  permissionOffice = true;

  configRegional = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    maxItems: 20,
    onChange: ($event) => {
    },
    onBlur: () => {
      this.getUnions();
    }
  };

  configSindicato = {
    labelField: 'initials',
    valueField: 'id',
    create: false,
    searchField: ['initials'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    maxItems: 200
  };

  permissionManagements = true;

  configManagement = {
    labelField: 'sigla',
    valueField: 'id',
    create: false,
    searchField: ['nome', 'sigla'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    maxItems: 200,
    onBlur: () => {
      if (this.formRegister.get('gerencia_id').value && this.formRegister.get('gerencia_id').value.length === 1) {
        this.permissionManagements = true;
        this.getDivisions();
      } else {
        this.permissionManagements = false;
      }
    },
    onChange($event) {
      if ($event.length) {
        // console.log("Option changed: ", $event);
      }
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

  optionsSindicatos = [
    {
      id: 1,
      name: 'Sindicato das Indústrias de Torrefação e Moagem de Café do Estado do Rio de Janeiro ',
      initials: 'SINCAFÉ'
    }
  ];

  optionCargos = [
    { id: 1, name: 'Gerente' },
    { id: 2, name: 'Coordenador' },
    { id: 3, name: 'Executivo' }
  ];
  cargos = [];
  optionGeneralManagement = [];

  constructor(private userService: UsersService, private fb: FormBuilder) { }

  ngOnInit() {

    this.formRegister = this.fb.group({
      name: new FormControl('', [Validators.minLength(4), Validators.required]),
      email: new FormControl('', [Validators.minLength(4), Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.minLength(14), Validators.required]),
      lotacao_id: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.minLength(4), Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
      confirmPassword: new FormControl('', [Validators.minLength(4), Validators.required]),
      gerencia_geral_id: new FormControl('', [Validators.required]),
      gerencia_id: new FormControl(''),
      divisao_id: new FormControl(''),
      relacionamento: this.fb.group({
        check_relacionamento: false,
        regionais: [],
        sindicatos: []
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
    const reg = this.optionLotacao[data[0] - 1];
    const carg = this.optionCargos[data[1] - 1];

    this.cargos.push({
      regional: {
        id: reg.id,
        nome: reg.nome,
      },
      cargo: {
        id: carg.name,
        nome: carg.id
      }
    });

    this.formRegister.get('cargos').patchValue(this.cargos);

    this.selectCargo = '';
    this.selectRegional = '';

    this.permissionOffice = !(carg.name === 'Executivo');
  }

  trackByFn(index, item) {
    // console.log('TrackBy:', item.id, 'at index', index);
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

    console.log(this.formRegister.valid, this.formRegister.errors);
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
    if (id) {
      this.userService.getGeneralManagement(id).subscribe(res => {
        if (res.data) {
          this.optionGeneralManagement = res.data;
          if (res.data.length === 1) {
            this.formRegister.get('gerencia_geral_id').setValue(res.data[0].id);
            this.getManagements();
          }
        }
      });
    }
  }

  getManagements() {
    const data = {
      lotacao_id: this.formRegister.get('lotacao_id').value,
      general_management_id: this.formRegister.get('gerencia_geral_id').value
    };

    if (data.lotacao_id && data.general_management_id) {
      this.userService.getManagements(data).subscribe(res => {
        if (res.data) {
          this.optionManagement = res.data;
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

    if (data.lotacao_id && data.general_management_id) {
      this.cargos = [];

      this.userService.getDivisions(data).subscribe(res => {
        if (res.data) {
          this.optionDivisions = res.data;
          if (res.data.length === 1) {
            console.log(res.data[0].id);
            this.formRegister.get('divisao_id').setValue(res.data[0].id);
          }
        }
      });
    }
  }

  getUnions() {
    const data = {
      regionais: this.formRegister.get('relacionamento.regionais').value
    };

    this.userService.getUnions(data).subscribe(res => {
      console.log(res);
    });
  }

  validateRepresentanteRegional() {
    const representanteRegional = this.formRegister.get('representante_regional.regional');
    const regionalId = this.formRegister.get('lotacao_id').value;
    const representanteCargo = this.formRegister.get('representante_regional.cargo');
    const validateRegional = regionalId && regionalId !== '10';

    if (validateRegional && !representanteRegional.value && !this.cargos.length) {
      representanteRegional.setErrors({ required: true });
    } else {
      representanteRegional.updateValueAndValidity();
    }

    if (validateRegional && !representanteCargo.value && !this.cargos.length) {
      representanteCargo.setErrors({ required: true });
    } else {
      representanteCargo.updateValueAndValidity();
    }

    if (representanteCargo.value && representanteRegional.value && !this.cargos.length) {
      alert('Adicione os cargos!');
      // this.formRegister.setErrors({ 'invalid': true });

    }
  }

  validateSede() {
    const checkRelacionamento = this.formRegister.get('relacionamento.check_relacionamento');
    const relacionamentoRegionais = this.formRegister.get('relacionamento.regionais');
    const relacionamentoSindicatos = this.formRegister.get('relacionamento.sindicatos');
    const regionalId = this.formRegister.get('lotacao_id');
    const divisaoId = this.formRegister.get('divisao_id');

    if (regionalId.value && regionalId.value === '10' && !divisaoId.value) {
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
