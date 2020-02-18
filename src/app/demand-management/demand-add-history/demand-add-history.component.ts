import {Component, OnInit, ViewChild, Input, Output, OnChanges, OnDestroy} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {EventEmitter} from 'protractor';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { DemandService } from '../demand.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-demand-add-history',
    templateUrl: './demand-add-history.component.html',
    styleUrls: ['./demand-add-history.component.scss'],
    providers: [DatePipe]
})
export class DemandAddHistoryComponent implements OnInit, OnChanges, OnDestroy {

    modalRef: BsModalRef;
    @ViewChild('modal', {static: false}) modal;
    @Input('openModal') openModal: boolean;
    @Input('demandSelected') demandSelected: any;
    @Output('close') close: EventEmitter;

    optionsDemandStatus = [];
    statusServiceSubscription: Subscription;
    formStatus: FormGroup;
    configDemandStatus = {
        labelField: 'label',
        valueField: 'id',
        create: false,
        searchField: ['label'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    constructor(
        private modalService: BsModalService,
        private fb: FormBuilder,
        private demandService: DemandService) {
    }

    ngOnInit() {

        this.formStatus = this.fb.group({
            status: new FormControl(''),
            cost: new FormControl(''),
            time_period: new FormControl(''),
            comment: new FormControl(''),
            demand_id: new FormControl('')
        });
    }

    ngOnChanges(changes: any) {
        if (changes && changes.openModal) {
            this.open();
        }
    }

    open() {
        if (this.demandSelected) {
            console.log(this.demandSelected);
            this.formStatus.get('demand_id').setValue(this.demandSelected.id);
            this.getStatus();
            this.modalRef = this.modalService.show(this.modal, {class: 'modal-lg modal-dialog-centered modal-demand'});
        }
    }

    getStatus() {
        this.statusServiceSubscription = this.demandService.getDemandStatus().subscribe(res => {
            if (res.data) {
                this.optionsDemandStatus = res.data;
            }
        });
    }

    onSubmit(form: any) {
        if (form.value) {
            this.demandService.setHistory(form.value).subscribe(res => {
                if (res.create) {
                    window.location.reload();
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.statusServiceSubscription) {
            this.statusServiceSubscription.unsubscribe();
        }
    }
}
