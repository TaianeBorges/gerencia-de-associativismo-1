import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DemandService } from '../demand.service';

@Component({
  selector: 'app-demand-filter',
  templateUrl: './demand-filter.component.html',
  styleUrls: ['./demand-filter.component.scss']
})
export class DemandFilterComponent implements OnInit {

  @ViewChild('formDemandFilter', { static: false }) formDemandFilter;
  @ViewChild('entidade', { static: false }) entidade;
  @ViewChild('cadastrante', { static: false }) cadastrante;
  @ViewChild('sindicatos', { static: false }) sindicatos;
  @ViewChild('status', { static: false }) status;
  @ViewChild('categoria', { static: false }) categoria;
  @ViewChild('setor', { static: false }) setor;

  @Output('formOnSubmit') formOnSubmit = new EventEmitter();

  formFilter;
  filterVisibility = true;
  configEntity = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
      // this.getUnions($event);
    },
    onBlur: () => {
    }
  };
  optionsEntity = [];
  configUnions = {
    labelField: 'sigla',
    valueField: 'id',
    create: false,
    searchField: ['nome', 'sigla'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
      // this.getUnions($event);
    },
    onBlur: () => {
    }
  };
  optionsUnions = [];
  configDemandStatus = {
    labelField: 'label',
    valueField: 'id',
    create: false,
    searchField: ['label'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
      // this.getUnions($event);
    },
    onBlur: () => {
    }
  };
  optionsDemandStatus = [];
  configDemandCategory = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
      // this.getUnions($event);
    },
    onBlur: () => {
    }
  };
  optionsDemandCategory = [];
  configSectors = {
    labelField: 'nome',
    valueField: 'id',
    create: false,
    searchField: ['nome'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    onChange: ($event: any) => {
      // this.getUnions($event);
    },
    onBlur: () => {
    }
  };
  optionsSectors = [];

  constructor(
    private fb: FormBuilder,
    private demandService: DemandService
  ) { }

  ngOnInit() {
    this.formFilter = this.fb.group({
      entidade_id: new FormControl(''),
      cadastrante_nome: new FormControl(''),
      sindicato_id: new FormControl(''),
      status_id: new FormControl(''),
      demanda_id: new FormControl(''),
      demanda_categoria_id: new FormControl(''),
      setor_id: []
    });

    this.getEntity();
    this.getUnions();
    this.getDemandStatus();
    this.getDemandCategories();
    this.getSectors();
  }

  getEntity() {
    this.demandService.getEntity().subscribe(res => {
      if (res.data) {
        this.optionsEntity = res.data;
      }
    });
  }

  getUnions() {
    this.demandService.getUnions().subscribe(res => {
      if (res.data) {
        this.optionsUnions = res.data;
      }
    });
  }

  getDemandStatus() {
    this.demandService.getDemandStatus().subscribe(res => {
      if (res.data) {
        this.optionsDemandStatus = res.data;
      }
    });
  }

  getDemandCategories() {
    this.demandService.getDemandCategories().subscribe(res => {
      if (res.data) {
        this.optionsDemandCategory = res.data;
      }
    });
  }

  getSectors() {
    this.demandService.getSectors().subscribe(res => {
      if (res.data) {
        this.optionsSectors = res.data;
      }
    });
  }

  onSubmit(form) {
    this.formOnSubmit.emit({ filters: form.value });
  }

  resetForm() {
    this.entidade = '';
    this.cadastrante = '';
    this.sindicatos = '';
    this.status = '';
    this.categoria = '';
    this.setor = '';
  }

  test(form) {
    console.log(form.value);
  }
}
