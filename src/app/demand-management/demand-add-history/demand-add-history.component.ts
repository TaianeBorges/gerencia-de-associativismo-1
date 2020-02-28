import {Component, OnInit, ViewChild, Input, Output, OnChanges, OnDestroy} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {EventEmitter} from 'protractor';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { DemandService } from '../demand.service';
import { Subscription } from 'rxjs';
import {CurrencyPipe} from '../../shared/pipes/currency.pipe';
import { UsersService } from 'src/app/users/users.service';

@Component({
    selector: 'app-demand-add-history',
    templateUrl: './demand-add-history.component.html',
    styleUrls: ['./demand-add-history.component.scss'],
    providers: [DatePipe, CurrencyPipe]
})
export class DemandAddHistoryComponent implements OnInit, OnChanges, OnDestroy {

    modalRef: BsModalRef;
    @ViewChild('modal', {static: false}) modal;
    @Input('openModal') openModal: boolean;
    @Input('demandSelected') demandSelected: any;
    @Output('close') close: EventEmitter;

    formControlCurrency;
    optionsForwardEmails = [];
    optionsDemandStatus = [];
    optionsManagements = [];
    statusServiceSubscription: Subscription;
    emailsByAreasTecnicasServiceSubscribe: Subscription;
    formStatus: FormGroup;
    managementsServiceSubscribe: Subscription;
    formStatusSubscription: Subscription;

    configDemandStatus = {
        labelField: 'label',
        valueField: 'id',
        create: false,
        searchField: ['label'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    configForwardEmails = {
        labelField: 'email',
        valueField: 'id',
        create: false,
        searchField: ['email'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 100,
        render: {
            option(data: any, escape: any) {
                return `<div class="option">
                    <span class="name">${escape(data.name)}</span> -
                    <span class="initial"><b>${escape(data.email)}</b></span>
                    </div>`;
            },
            item(data: any, escape: any) {
                return '<div class="item">' + escape(data.email) + '</div>';
            }
        }
    };

    configManagements = {
        labelField: 'initial',
        valueField: 'id',
        create: false,
        searchField: ['initial'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 100,
        onBlur: () => {
            this.getEmailsByManagements();
        }
    };
    
    currentUser;

    constructor(
        private modalService: BsModalService,
        private fb: FormBuilder,
        private demandServices: DemandService,
        private currency: CurrencyPipe,
        private userService: UsersService
        ) {
    }

    ngOnInit() {

        this.formStatus = this.fb.group({
            status: new FormControl(''),
            cost: new FormControl(),
            time_period: new FormControl(''),
            comment: new FormControl(''),
            demand_id: new FormControl(''),
            forwarded_to_the_technical_area: this.fb.group({
                managements: [],
                check_forwarded: new FormControl(false),
                emails: []
            })
        });

        this.userService.getUserAuthenticated().subscribe(res => {
            if (res.authenticate) {
                this.currentUser = res.user;
            }
        })

        this.getManagements();

        if (this.formStatus) {
            this.formStatusSubscription = this.formStatus.get('cost').valueChanges.subscribe(res => {
                if (res) {
                    this.formControlCurrency = this.currency.transform(res);
                }
            })
        }
    }

    ngOnChanges(changes: any) {
        if (changes && changes.openModal) {
            this.open();
        }
    }

    open() {
        if (this.demandSelected) {
            this.formStatus.get('demand_id').setValue(this.demandSelected.id);
            this.getStatus();
            this.modalRef = this.modalService.show(this.modal, {class: 'modal-lg modal-dialog-centered modal-demand'});
        }
    }

    getStatus() {
        const data = {register:true};

        this.statusServiceSubscription = this.demandServices.getDemandStatus(data).subscribe(res => {
            if (res.data) {
                this.optionsDemandStatus = res.data;
            }
        });
    }

    getManagements() {
        this.managementsServiceSubscribe = this.demandServices.getManagements().subscribe(res => {
            if (res) {
                this.optionsManagements = res.data;
            }
        });
    }

    getEmailsByManagements() {
        const data = this.formStatus.get('forwarded_to_the_technical_area.managements').value;

        if (data) {
            this.emailsByAreasTecnicasServiceSubscribe = this.demandServices.getEmailsByManagements(data).subscribe(res => {
                if (res) {
                    this.optionsForwardEmails = res.data;
                }
            });
        }

    }

    onSubmit(form: any) {
        if (form.value) {
            this.formStatus.get('cost').setValue(this.formControlCurrency);
            
            this.demandServices.setHistory(form.value).subscribe(res => {
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

        if (this.emailsByAreasTecnicasServiceSubscribe) {
            this.emailsByAreasTecnicasServiceSubscribe.unsubscribe();
        }

        if (this.managementsServiceSubscribe) {
            this.managementsServiceSubscribe.unsubscribe();
        }

        if (this.formStatusSubscription) {
            this.formStatusSubscription.unsubscribe();
        }
    }
}
