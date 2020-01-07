import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DemandService } from '../demand.service';

@Component({
  selector: 'app-demand-filter',
  templateUrl: './demand-filter.component.html',
  styleUrls: ['./demand-filter.component.scss']
})
export class DemandFilterComponent implements OnInit {

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
    maxItems: 101,
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
  configDemandSectors = {
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
  optionsDemandSectors = [];

  constructor(
    private fb: FormBuilder,
    private demandService: DemandService
  ) { }

  ngOnInit() {
    this.formFilter = this.fb.group({
      entidade_id: new FormControl(''),
      cadastrante_nome: new FormControl(''),
      sindicatos: [],
      status_id: new FormControl(),
      demanda_id: new FormControl(),
      demanda_categoria_id: new FormControl(),
      setores: []
    });

    this.getEntity();
    this.getUnions();
    this.getDemandStatus();
    this.getDemandCategories();
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

  test(form) {
    console.log(form.value);
  }
}
