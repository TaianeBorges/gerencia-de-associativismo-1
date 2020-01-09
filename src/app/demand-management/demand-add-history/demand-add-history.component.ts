import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-demand-add-history',
  templateUrl: './demand-add-history.component.html',
  styleUrls: ['./demand-add-history.component.scss']
})
export class DemandAddHistoryComponent implements OnInit {

  modalRef: BsModalRef;
  @ViewChild('modal', { static: false }) modal;
  @Input('openModal') openModal: boolean;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: any) {
    if (changes && changes.openModal.currentValue) {
      this.open();
    }
  }

  open() {
    this.modalRef = this.modalService.show(this.modal, { class: 'modal-lg modal-dialog-centered modal-demand' });
  }
}
