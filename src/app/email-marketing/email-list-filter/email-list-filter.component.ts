import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-email-list-filter',
  templateUrl: './email-list-filter.component.html',
  styleUrls: ['./email-list-filter.component.scss']
})
export class EmailListFilterComponent implements OnInit {
  
  @Output('formOnSubmit') formOnSubmit = new EventEmitter();
  filterModal: BsModalRef;
  formFilter;
  
  selectTargetAudience = [];
  selectStatus = [];

  configTargetAudience = {
      labelField: 'name',
      valueField: 'id',
      create: false,
      searchField: ['name'],
      plugins: ['dropdown_direction', 'remove_button'],
      dropdownDirection: 'down',
      maxItems: 30
  };

  optionsTargetAudience = [
    {id: 1, name: 'Sindicatos'},
    {id: 2, name: 'Empresas'},
    {id: 3, name: 'Pessoas Físicas'}
  ];

  configStatus = {
    labelField: 'name',
    valueField: 'id',
    create: false,
    searchField: ['name'],
    plugins: ['dropdown_direction', 'remove_button'],
    dropdownDirection: 'down',
    maxItems: 30
  };

  optionsStatus = [
    {id: 1, name: 'Em espera'},
    {id: 2, name: 'Enviado'},
    {id: 3, name: 'Pendente de aprovação'}
  ];
  
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService
    ) { }
  
    ngOnInit() {
      this.formFilter = this.fb.group({
        target_audience: new FormControl(''),
        status: new FormControl('')
      });
    }
    
    onSubmit() {
      this.filterModal.hide();
      this.formOnSubmit.emit({filters: this.formFilter.value});
    }

    resetForm() {
      this.selectTargetAudience = [];
      this.selectStatus = [];
      
      setTimeout(() => {
        this.onSubmit()
      }, 200);
    }
  
    openFilter(template: TemplateRef<any>) {
      this.filterModal = this.modalService.show(template);
    }
    
    closeModal() {
      this.filterModal.hide();
    }
}
