import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  
  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService
    ) { }
  
    ngOnInit() {
      this.formFilter = this.fb.group({});
    }
    
    onSubmit() {
      this.filterModal.hide();
      this.formOnSubmit.emit({filters: this.formFilter.value});
    }

    resetForm() {
      this.filterModal.hide();
    }
  
    openFilter(template: TemplateRef<any>) {
      this.filterModal = this.modalService.show(template);
    }
    
    closeModal() {
      this.filterModal.hide();
    }
}
