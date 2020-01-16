import { Component, OnInit } from '@angular/core';
import { SharedsService } from 'src/app/shared/shareds.service';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-demand-add',
  templateUrl: './demand-add.component.html',
  styleUrls: ['./demand-add.component.scss']
})
export class DemandAddComponent implements OnInit {

  formDemand: FormGroup;
  optionsEntities = [];
  configEntities = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
    },
    onBlur: () => {
    }
  };
  optionsUnions = [];
  configUnions = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
    },
    onBlur: () => {
    }
  };
  optionsCategory = [];
  configCategory = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
    },
    onBlur: () => {
    }
  };
  optionsSubcategory = [];
  configSubcategory = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
    },
    onBlur: () => {
    }
  };
  optionsCategoryOE = [];
  configCategoryOE = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
    },
    onBlur: () => {
    }
  };
  optionsSubcategoryOE = [];
  configSubcategoryOE = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
    },
    onBlur: () => {
    }
  };
  optionsScope = [];
  configScope = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
    },
    onBlur: () => {
    }
  };
  optionsAreas = [];
  configAreas = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
    },
    onBlur: () => {
    }
  };

  optionsForwardEmails = [];
  configForwardEmails = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
    },
    onBlur: () => {
    }
  };


  constructor(private sharedService: SharedsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.sharedService.setTitle(`Nova Demanda`);

    this.formDemand = this.fb.group({
      cadastrante: new FormGroup({
        nome: new FormControl('', [Validators.required]),
        sobrenome: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required])
      }),
      entidade_id: new FormControl(''),
      categoria_demanda: new FormControl(''),
      subcategoria_demanda: new FormControl(''),
      escopo: new FormControl(''),
      empresa_associada: new FormGroup({
        cnpj: new FormControl(''),
        nome_fantasia: new FormControl('')
      }),
      prazo: new FormControl(''),
      descricao: new FormControl(''),
      sindicato_id: [],
      setor_sindicato: new FormControl(),
      encaminhamento: this.fb.group({
        areas_envolvidas: [],
        encaminhar_check: new FormControl(false),
        emails: []
      }),
      subcategoria_oe: new FormControl(''),
      categoria_oe: new FormControl(''),
    });
  }

  onSubmit(form) {
    console.log(form.value);
  }
}
