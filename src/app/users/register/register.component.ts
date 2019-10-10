import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as jQuery from 'jquery';

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
    labelField: 'name',
    valueField: 'id',
    create: false,
    searchField: ['name'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    maxItems: 20
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

  optionRegional = [
    { id: 1, name: 'Firjan Caxias' },
    { id: 2, name: 'Firjan Centro Norte' },
    { id: 3, name: 'Firjan Centro Sul' },
    { id: 4, name: 'Firjan Leste' },
    { id: 5, name: 'Firjan Noroeste' },
    { id: 6, name: 'Firjan Norte' },
    { id: 7, name: 'Firjan Nova Iguaçu' },
    { id: 8, name: 'Firjan Serrana' },
    { id: 9, name: 'Firjan Sul' },
    { id: 10, name: 'Rio Capital' },
    { id: 11, name: 'SSE Capital' }
  ];

  optionsSindicatos = [
    {
      id: 1,
      name: 'Sindicato da Indústria de Vestuário do Rio de Janeiro e Grande Rio ',
      initials: 'MODA RIO'
    },
    {
      id: 2,
      name: 'Sindicato da Indústria Panificação e Confeitaria do Município do Rio de Janeiro ',
      initials: 'RIO+PÃO'
    },
    {
      id: 3,
      name: 'Sindicato das Indústrias Metalúrgicas, ecânicase de Material Elétrico no Estado do Rio de Janeiro ',
      initials: 'RJ.METAL'
    },
    {
      id: 4,
      name: 'Sindicato das Indústrias de Materiais e Equipamentos Rodoviários e Ferroviários do Estado do Rio de Janeiro ',
      initials: 'RODOFERRO'
    },
    {
      id: 5,
      name: 'Sindicato das Indústrias de Alimentação no Noroeste do Estado do Rio de Janeiro ',
      initials: 'SIANERJ'
    },
    {
      id: 6,
      name: 'Sindicato das Indústrias de Alimentos do Município do Rio de Janeiro ',
      initials: 'SIARJ'
    },
    {
      id: 7,
      name: 'Sindicato Interestadual da Indústria de Audiovisual ',
      initials: 'SICAV'
    },
    {
      id: 8,
      name: 'Sindicato da Indústria de Cerâmica para Construção de Campos',
      initials: 'SICCC'
    },
    {
      id: 9,
      name: 'Sindicato Indústria da Extração do Sal do Estado do Rio de Janeiro ',
      initials: 'SIESAL'
    },
    {
      id: 10,
      name: 'Sindicato das Indústrias Gráficas do Município do Rio de Janeiro ',
      initials: 'SIGRAF'
    },
    {
      id: 11,
      name: 'Sindicato das Indústrias Gráficas de Petrópolis',
      initials: 'SIGRAP'
    },
    {
      id: 12,
      name: 'Sindicato das Indústrias Gráficas do Estado do Rio de Janeiro ',
      initials: 'SIGRARJ'
    },
    {
      id: 13,
      name: 'Sindicato das Indústria de Mármores, ranitose Rochas Afins do Estado do Rio de Janeiro',
      initials: 'SIMAGRAN'
    },
    {
      id: 14,
      name: 'Sindicato das Indústrias de Massas Alimentícias, anificaçãoe Afins da Baixada Fluminense ',
      initials: 'SIMAPAN'
    },
    {
      id: 15,
      name: 'Sindicato dos Mineradores de Areia Estado Rio de Janeiro ',
      initials: 'SIMARJ'
    },
    {
      id: 16,
      name: 'Sindicato das Indústrias Mecânicas e de Material Elétrico do Município do Rio de Janeiro ',
      initials: 'SIMME'
    },
    {
      id: 17,
      name: 'Sindicato da Indústria de Material Plástico do Estado do Rio de Janeiro ',
      initials: 'SIMPERJ'
    },
    {
      id: 18,
      name: 'Sindicato Nacional da Indústria de Álcalis ',
      initials: 'SINALCALIS'
    },
    {
      id: 19,
      name: 'Sindicato Nacional da Indústria da Construção Naval ',
      initials: 'SINAVAL'
    },
    {
      id: 20,
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

  constructor() { }

  ngOnInit() {

    this.formRegister = new FormGroup({
      name: new FormControl('', [Validators.minLength(4), Validators.required]),
      email: new FormControl('', [Validators.minLength(4), Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.minLength(14), Validators.required]),
      unidade: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.minLength(4), Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.required]),
      confirmPassword: new FormControl('', [Validators.minLength(4), Validators.required]),
      divisao: new FormControl('', [Validators.required]),
      relacionamento: new FormControl(''),
      regional: new FormControl(''),
      sindicato: new FormControl(''),
      regional_representante: new FormControl(''),
      cargo_representante: new FormControl('')
    });
  }

  addOffice(data: any) {
    const reg = this.optionRegional[data[0] - 1];
    const carg = this.optionCargos[data[1] - 1];

    this.cargos.push({
      regional: reg.name,
      cargo: carg.name
    });
    this.selectCargo = '';
    this.selectRegional = '';

    this.permissionOffice = !(carg.name === 'Executivo');

    // console.log(this.trackByFn);
    // if (carg.name === 'Executivo') {
    //   delete this.optionCargos[data[1] - 1];
    // }
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
    console.log(data.value);
  }
}
