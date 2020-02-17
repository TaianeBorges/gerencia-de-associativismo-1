import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-demand-add-history',
  templateUrl: './demand-add-history.component.html',
  styleUrls: ['./demand-add-history.component.scss']
})
export class DemandAddHistoryComponent implements OnInit {

  modalRef: BsModalRef;
  @ViewChild('modal', { static: false }) modal;
  @Input('openModal') openModal: boolean;
  @Input('demandSelected') demandSelected: any;
  @Output('close') close: EventEmitter;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    if (changes && changes.openModal) {
      // this.open();
    }
  }

  open() {
    this.modalRef = this.modalService.show(this.modal, { class: 'modal-lg modal-dialog-centered modal-demand' });
  }
}
