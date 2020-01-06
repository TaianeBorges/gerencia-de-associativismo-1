import { Component, OnInit, Input, TemplateRef, Output, SimpleChange, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-demand-history',
  templateUrl: './demand-history.component.html',
  styleUrls: ['./demand-history.component.scss']
})
export class DemandHistoryComponent implements OnInit {

  modalRef: BsModalRef;

  @ViewChild('modal', { static: false }) modal;
  @Input('demandSelected') demandSelected: any;
  @Input('openModal') openModal: boolean;
  @Output('close') close: EventEmitter;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    if (changes && changes.openModal) {
      this.open();
    }
  }

  open() {
    if (this.demandSelected) {
      this.modalRef = this.modalService.show(this.modal, { class: 'modal-lg modal-dialog-centered modal-demand' });
    }
  }

}
