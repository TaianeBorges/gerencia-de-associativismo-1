import {
    Component,
    OnInit,
    ViewChild,
    Input,
    Output,
    OnChanges,
    OnDestroy,
    ElementRef,
    EventEmitter,
    ViewEncapsulation
} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DemandService} from '../demand.service';
import {Subscription} from 'rxjs';
import {CurrencyPipe} from '../../shared/pipes/currency.pipe';
import {UsersService} from 'src/app/users/users.service';
import {AlertService} from '../../shared/alerts/alert.service';

@Component({
    selector: 'app-demand-add-history',
    templateUrl: './demand-add-history.component.html',
    styleUrls: ['./demand-add-history.component.scss'],
    providers: [DatePipe, CurrencyPipe],
    encapsulation: ViewEncapsulation.None
})
export class DemandAddHistoryComponent implements OnInit, OnChanges, OnDestroy {

    modalRef: BsModalRef;
    @ViewChild('modal', {static: false}) modal;
    @Input('openModal') openModal: boolean;
    @Input('demandSelected') demandSelected: any;
    @Output('closeHistory') closeHistory = new EventEmitter();
    @ViewChild('selectizeRegional', {static: false}) redel: ElementRef;

    formControlCurrency;
    optionsForwardEmails = [];
    optionsDemandStatus = [];
    optionsManagements = [];
    optionsRegional = [];
    regionals = [];
    statusServiceSubscription: Subscription;
    emailsByAreasTecnicasServiceSubscribe: Subscription;
    formStatus: FormGroup;
    managementsServiceSubscribe: Subscription;
    formStatusSubscription: Subscription;
    setHistoryServiceSubscription: Subscription;
    regionalsServiceSubscribe: Subscription;

    configRegional = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event: any) => {
            setTimeout(() => {
                this.getEmails();
            }, 500);
        }
    };

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
        searchField: ['name', 'email'],
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
        searchField: ['initial', 'name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 100,
        onBlur: () => {
            this.getEmails();
        },
        render: {
            option(data: any, escape: any) {
                return `<div class="option">
                    <span class="name">${escape(data.initial)}</span> -
                    <span class="initial"><b>${escape(data.name)}</b></span>
                    </div>`;
            },
            item(data: any, escape: any) {
                return '<div class="item">' + escape(data.initial) + '</div>';
            }
        }
    };

    currentUser;
    permissionSyndicate;

    constructor(
        private modalService: BsModalService,
        private fb: FormBuilder,
        private demandServices: DemandService,
        private currency: CurrencyPipe,
        private userService: UsersService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {

        this.formStatus = this.fb.group({
            status: new FormControl(''),
            cost: new FormControl(),
            time_period: new FormControl(''),
            comment: new FormControl('', [Validators.required]),
            demand_id: new FormControl(''),
            syndicate_permission: new FormControl(''),
            forwarded_to_the_technical_area: this.fb.group({
                regional: new FormControl(),
                managements: [],
                check_forwarded: new FormControl(false),
                emails: []
            }),
            justification: new FormControl('')
        });

        this.getManagements();

        if (this.formStatus) {
            this.formStatusSubscription = this.formStatus.get('cost').valueChanges.subscribe(res => {
                if (res) {
                    this.formControlCurrency = this.currency.transform(res);
                }
            });


            this.getRegionals();
        }
    }

    ngOnChanges(changes: any) {
        if (changes && changes.openModal) {
            this.open();
        }
    }

    getRegionals() {
        this.regionalsServiceSubscribe = this.demandServices.getRegionals().subscribe(res => {
            if (res && res.data) {
                this.regionals = res.data;
            }
        });
    }


    open() {
        if (this.demandSelected) {

            this.formControlCurrency = '';

            this.formStatus.get('status').reset();
            this.formStatus.get('cost').reset();
            this.formStatus.get('time_period').reset();
            this.formStatus.get('comment').reset();
            this.formStatus.get('demand_id').reset();
            this.formStatus.get('justification').reset();
            this.formStatus.get('syndicate_permission').reset();

            this.formStatus.get('demand_id').setValue(this.demandSelected.id);
            this.getStatus();
            this.modalRef = this.modalService.show(this.modal, {class: 'modal-lg modal-dialog-centered modal-demand'});

            this.permissionSyndicate = ((this.demandSelected.entity_id == 2 || this.demandSelected.entity_id == 3) && !this.demandSelected.permission_syndicate);

            let regional = [];

            this.regionals.forEach(element => {
                if (this.demandSelected.regional_id && element.id == this.demandSelected.regional_id) {
                    regional.push(element);
                }

                if (this.demandSelected.regional_id == null) {
                    regional.push(element);
                }
            });

            if (regional) {
                this.optionsRegional = [];
                this.optionsRegional.push(regional);
            }


            this.userService.getUserAuthenticated().subscribe(res => {
                if (res.authenticate) {
                    this.currentUser = res.user;
                }
            });
        }
    }

    getStatus() {
        const data = {register: true};

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

    getEmails() {
        const data = {
            managements: this.formStatus.get('forwarded_to_the_technical_area.managements').value,
            regional: this.formStatus.get('forwarded_to_the_technical_area.regional').value
        };

        this.emailsByAreasTecnicasServiceSubscribe = this.demandServices.getEmails(data).subscribe(res => {
            if (res) {
                this.optionsForwardEmails = res.data;
            }
        });
    }

    validationsFormDemand() {
        this.formStatus.get('status').setValidators([]);
        this.formStatus.get('forwarded_to_the_technical_area.emails').setValidators([]);
        this.formStatus.get('comment').setValidators([]);
        this.formStatus.get('justification').setValidators([]);
        this.formStatus.get('syndicate_permission').setValidators([]);

        if ((this.demandSelected.entity_id === 2 || this.demandSelected.entity_id === 3) &&
            (!(this.demandSelected.entity_id === 2 || this.demandSelected.entity_id === 3) && (this.formStatus.get('syndicate_permission').value === null) && this.demandSelected.permission_syndicate != 1)) {
            this.formStatus.get('syndicate_permission').setValidators([Validators.required]);
        }

        if ((!this.formStatus.get('status').value || !this.formStatus.get('comment').value) && (
            ((this.demandSelected.entity_id === 2 || this.demandSelected.entity_id === 3) && (this.formStatus.get('syndicate_permission').value == 1 || this.demandSelected.permission_syndicate)) ||
            !((this.demandSelected.entity_id === 2 || this.demandSelected.entity_id === 3)))) {
            this.formStatus.get('status').setValidators([Validators.required]);
            this.formStatus.get('comment').setValidators([Validators.required]);
        }

        if (this.formStatus.get('syndicate_permission').value == 3 || this.formStatus.get('syndicate_permission').value == 2) {
            this.formStatus.get('justification').setValidators([Validators.required]);

        }

        if (this.formStatus.get('forwarded_to_the_technical_area.check_forwarded').value && !this.optionsForwardEmails.length) {
            this.formStatus.get('forwarded_to_the_technical_area.emails').setValidators([Validators.required]);
        }

        this.formStatus.get('syndicate_permission').updateValueAndValidity();
        this.formStatus.get('forwarded_to_the_technical_area.emails').updateValueAndValidity();
        this.formStatus.get('status').updateValueAndValidity();
        this.formStatus.get('comment').updateValueAndValidity();
        this.formStatus.get('justification').updateValueAndValidity();

    }

    onSubmit(form: any) {
        this.formStatus.markAllAsTouched();

        this.validationsFormDemand();

        if (this.formStatus.valid) {

            this.formStatus.get('cost').setValue(this.formControlCurrency);

            this.setHistoryServiceSubscription = this.demandServices.setHistory(form.value).subscribe(res => {
                if (res.create) {
                    this.formStatus.get('status').reset();
                    this.formStatus.get('cost').reset();
                    this.formStatus.get('time_period').reset();
                    this.formStatus.get('comment').reset();
                    this.formStatus.get('demand_id').reset();
                    this.formStatus.get('justification').reset();
                    this.formStatus.get('syndicate_permission').reset();
                    this.modalRef.hide();
                    this.closeHistory.emit(true);

                    const alert = {
                        message: 'Status atualizado com sucesso!',
                        title: 'Parabens!',
                        status: 200,
                        icon: 'check_circle',
                        color: 'success'
                    };

                    this.alertService.alertShow(alert);
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

        if (this.setHistoryServiceSubscription) {
            this.setHistoryServiceSubscription.unsubscribe();
        }

        if (this.regionalsServiceSubscribe) {
            this.regionalsServiceSubscribe.unsubscribe();
        }
    }
}
