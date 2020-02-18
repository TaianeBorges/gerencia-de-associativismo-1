import {Component, OnInit, ViewChild, Input, Output, OnChanges} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {EventEmitter} from 'protractor';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-demand-add-history',
    templateUrl: './demand-add-history.component.html',
    styleUrls: ['./demand-add-history.component.scss'],
    providers: [DatePipe]
})
export class DemandAddHistoryComponent implements OnInit, OnChanges {

    modalRef: BsModalRef;
    @ViewChild('modal', {static: false}) modal;
    @Input('openModal') openModal: boolean;
    @Input('demandSelected') demandSelected: any;
    @Output('close') close: EventEmitter;

    optionsStatus = [];

    formStatus: FormGroup;

    constructor(private modalService: BsModalService, private fb: FormBuilder) {
    }

    ngOnInit() {

        this.formStatus = this.fb.group({
            status: new FormControl(''),
            cost: new FormControl(''),
            time_period: new FormControl(''),
            comment: new FormControl('')
        });
    }

    ngOnChanges(changes: any) {
        if (changes && changes.openModal) {
            this.open();
        }
    }

    open() {
        if (this.demandSelected) {
            this.modalRef = this.modalService.show(this.modal, {class: 'modal-lg modal-dialog-centered modal-demand'});
        }
    }

    onSubmit(form: any) {
        console.log(form.value);
    }
}
