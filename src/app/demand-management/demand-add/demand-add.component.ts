import {Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from 'src/app/shared/shared.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DemandService} from '../demand.service';
import {CNPJPipe} from '../../shared/pipes/cnpj.pipe';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alerts/alert.service';
import {UsersService} from 'src/app/users/users.service';
import {AuthService} from 'src/app/auth/auth.service';
import {ValidateUrl} from '../../shared/validators/cnpj.validator';

@Component({
    selector: 'app-demand-add',
    templateUrl: './demand-add.component.html',
    styleUrls: ['./demand-add.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemandAddComponent implements OnInit, OnDestroy {

    formDemand: FormGroup;
    user;
    council;
    category;
    subcategory;
    subCategoryEO;
    oeCategory;
    oeSubcategory;
    cnpj;
    optionsEntities = [];
    configEntities = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event) => {

            this.formDemand.get('syndicate_permission').reset('');
            this.formDemand.get('syndicates_ids').setValue([]);
            this.formDemand.get('sector_id').reset('');
            this.formDemand.get('legal_framework').reset();
            this.formDemand.get('type').reset();

            this.formDemand.get('council_id').setValue('');
            this.formDemand.get('council_id').reset('');
            this.council = '';

            this.formDemand.get('company').get('cnpj').reset('');
            this.formDemand.get('company').get('name').reset('');

            if (parseInt($event, 10) === 1 || parseInt($event, 10) === 2) {
                this.getUnions();
            }

            if (
                parseInt($event, 10) === 4 ||
                parseInt($event, 10) === 5 ||
                parseInt($event, 10) === 6 ||
                parseInt($event, 10) === 7 ||
                parseInt($event, 10) === 9
            ) {
                this.getAdvices($event);
            }

            if (parseInt($event, 10) === 8) {
                this.getState();
            }
        }
    };

    optionsUnions = [];
    configUnions = {
        labelField: 'initial',
        valueField: 'id',
        create: false,
        searchField: ['initial', 'name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 100
    };

    optionsCategory = [];
    configCategory = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event: any) => {
            this.subcategory = '';
            this.getSubcategories($event);
        }
    };

    configSectorGroup = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };
    optionsSectorGroup = [];

    optionsSubcategory = [];
    configSubcategory = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    optionsCategoryOE = [];
    configCategoryOE = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event: any) => {
            this.subCategoryEO = '';

            this.getSubcategoriesOE($event);
        }
    };

    optionsSubcategoryOE = [];
    configSubcategoryOE = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    optionsAdvices = [];
    configAdvices = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    optionsScope = [];
    configScope = {
        labelField: 'label',
        valueField: 'id',
        create: false,
        searchField: ['label'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 10
    };

    optionsManagements = [];
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

    optionsForwardEmails = [];
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

    optionState = [];
    optionsLegalFramework = [];
    optionsRegional = [];

    configRegional = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event: any) => {
            if ($event) {
                this.getEmails($event);
            }
        }
    };

    configLegalFramework = {
        labelField: 'label',
        valueField: 'id',
        create: false,
        searchField: ['label'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    optionsType = [];
    configType = {
        labelField: 'label',
        valueField: 'id',
        create: false,
        searchField: ['label'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    entity;
    entityServiceSubscribe: Subscription;
    unionServiceSubscribe: Subscription;
    categoryServiceSubscribe: Subscription;
    subCategoryServiceSubscribe: Subscription;
    subScopeServiceSubscribe: Subscription;
    categoryEOServiceSubscribe: Subscription;
    subCategoryOEServiceSubscribe: Subscription;
    registerDemandService: Subscription;
    managementsServiceSubscribe: Subscription;
    emailsByAreasTecnicasServiceSubscribe: Subscription;
    groupUnionServiceSubScribe: Subscription;
    advicesServiceSubscribe: Subscription;
    stateServiceSubscribe: Subscription;
    cnpjChangesSubscription: Subscription;
    regionalsServiceSubscribe: Subscription;
    currentUser;

    constructor(
        private sharedService: SharedService,
        private fb: FormBuilder,
        private demandServices: DemandService,
        private el: ElementRef,
        private cnpjPipe: CNPJPipe,
        private router: Router,
        private alertService: AlertService,
        private userService: UsersService,
        private checkAuthorization: AuthService
    ) {
        this.getUser();
    }

    ngOnInit() {
        this.sharedService.setTitle(`Nova Demanda`);

        this.formDemand = this.fb.group({
            requester: new FormGroup({
                name: new FormControl('', [Validators.required]),
                last_name: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required])
            }),
            entity_id: new FormControl('', [Validators.required]),
            syndicate_permission: new FormControl(''),
            demand_category: new FormControl('', [Validators.required]),
            demand_subcategory: new FormControl('', [Validators.required]),
            scope: [],
            company: new FormGroup({
                cnpj: new FormControl('', [ValidateUrl]),
                name: new FormControl('')
            }),
            time_period: new FormControl(''),
            description: new FormControl('', [Validators.required]),
            syndicates_ids: [],
            sector_id: new FormControl(),
            legal_framework: new FormControl(),
            type: new FormControl(),
            council_id: new FormControl(''),
            forwarded_to_the_technical_area: this.fb.group({
                regional: new FormControl(),
                managements: [],
                check_forwarded: new FormControl(false),
                emails: []
            }),
            oe_subcategory: new FormControl(''),
            oe_category: new FormControl(''),
            regional_id: new FormControl(''),
            justification: new FormControl(''),
            theme: new FormControl(0),
            themeNew: new FormControl(''),
            campoProjetos: new FormControl('')
        });

        this.currentUser = JSON.parse(localStorage.getItem('user'));

        if (this.formDemand) {
            this.getEntity();
            this.getCategories();
            this.getScope();
            this.getCategoriesOE();
            this.getManagements();
            this.getRegionals();
        }
    }

    maskCnpj(val) {
        if (val.value) {
            val = this.cnpjPipe.transform(val.value);
            this.formDemand.get('company').get('cnpj').setValue(val);
            this.formDemand.get('company').get('cnpj').updateValueAndValidity();
        }
    }

    getEntity(): void {
        this.entityServiceSubscribe = this.demandServices.getEntity().subscribe(res => {
            this.optionsEntities = res.data;
        });
    }

    getUnions(): void {
        this.unionServiceSubscribe = this.demandServices.getUnions().subscribe(res => {
            this.optionsUnions = res.data;
        });
    }

    getSectorGroup() {
        this.groupUnionServiceSubScribe = this.demandServices.getSectors().subscribe(res => {
            this.optionsSectorGroup = res.data;
        });
    }

    getCategories(): void {
        this.categoryServiceSubscribe = this.demandServices.getDemandCategories().subscribe(res => {
            this.optionsCategory = res.data;
        });
    }

    getSubcategories(id: any): void {
        if (id) {
            this.subCategoryServiceSubscribe = this.demandServices.getDemandSubcategories(id).subscribe(res => {
                this.formDemand.get('demand_subcategory').reset('');
                this.optionsSubcategory = res.data;
            });
        }
    }

    getScope() {
        this.subScopeServiceSubscribe = this.demandServices.getScope().subscribe(res => {
            this.optionsScope = res.data;
        });
    }

    getCategoriesOE(): void {
        this.categoryEOServiceSubscribe = this.demandServices.getDemandCategoriesEO().subscribe(res => {
            this.optionsCategoryOE = res.data;
        });
    }

    getSubcategoriesOE(id: any): void {
        if (id) {
            this.subCategoryOEServiceSubscribe = this.demandServices.getDemandSubcategoriesOE(id).subscribe(res => {
                this.optionsSubcategoryOE = res.data;
            });
        }
    }

    getManagements() {
        this.managementsServiceSubscribe = this.demandServices.getManagements().subscribe(res => {
            if (res) {
                if (this.currentUser && this.currentUser.user && this.currentUser.user.role !== 3 && this.currentUser.user.role !== 4 && this.currentUser.user.role !== 5) {
                    this.optionsManagements = res.data;
                } else {
                    for (let value of res.data) {
                        if (value.initial === 'GEA') {
                            this.optionsManagements = [value];
                        }
                    }
                }
            }
        });
    }

    getEmails(regional?) {
        const data = {
            managements: this.formDemand.get('forwarded_to_the_technical_area.managements').value,
            regional: regional ? regional : this.formDemand.get('forwarded_to_the_technical_area.regional').value
        };

        if (data) {
            this.emailsByAreasTecnicasServiceSubscribe = this.demandServices.getEmails(data).subscribe(res => {
                if (res) {
                    this.optionsForwardEmails = res.data;
                }
            });
        }
    }

    getAdvices(data) {
        if (data) {
            this.advicesServiceSubscribe = this.demandServices.getAdvices(data).subscribe(res => {
                if (res) {
                    this.optionsAdvices = res.data;
                }
            });
        }
    }

    getState() {
        this.stateServiceSubscribe = this.demandServices.getState().subscribe(res => {
            if (res && res.data) {
                this.optionsLegalFramework = res.data.legal_framework;
                this.optionsType = res.data.type;
            }
        });
    }

    getRegionals() {
        this.regionalsServiceSubscribe = this.demandServices.getRegionals().subscribe(res => {
            if (res && res.data) {
                this.optionsRegional = res.data;
            }
        });
    }

    validationsFormDemand() {

        let entity = this.formDemand.get('entity_id').value;
        let demandCategory = this.formDemand.get('demand_category').value;
        let syndicatePermission = this.formDemand.get('syndicate_permission').value;
        entity = +entity;
        demandCategory = +demandCategory;
        syndicatePermission = +syndicatePermission;

        this.formDemand.get('syndicates_ids').setValidators([]);
        this.formDemand.get('company.cnpj').setValidators([]);
        this.formDemand.get('council_id').setValidators([]);
        this.formDemand.get('legal_framework').setValidators([]);
        this.formDemand.get('type').setValidators([]);
        this.formDemand.get('forwarded_to_the_technical_area.emails').setValidators([]);
        this.formDemand.get('oe_category').setValidators([]);
        this.formDemand.get('oe_subcategory').setValidators([]);
        this.formDemand.get('justification').setValidators([]);

        // Sindicato
        if (entity && (entity === 1 || entity === 2)) {
            this.formDemand.get('syndicates_ids').setValidators([Validators.required]);
        }

        // Empresa associada a sindicato
        if (entity && entity === 2) {
            this.formDemand.get('company.cnpj').setValidators([Validators.required]);
        }

        if (entity && entity === 2 && (syndicatePermission === 3 || syndicatePermission === 2)) {
            this.formDemand.get('justification').setValidators([Validators.required]);
        }

        // Conselho regional
        if (entity && entity >= 4 && entity <= 9 && entity !== 8) {
            this.formDemand.get('council_id').setValidators([Validators.required]);
        }

        // Poder publico
        if (entity && entity === 8) {
            this.formDemand.get('legal_framework').setValidators([Validators.required]);
            this.formDemand.get('type').setValidators([Validators.required]);
        }

        if (demandCategory && demandCategory === 4) {
            this.formDemand.get('oe_category').setValidators([Validators.required]);
            this.formDemand.get('oe_subcategory').setValidators([Validators.required]);

        }

        this.formDemand.get('company.cnpj').updateValueAndValidity();
        this.formDemand.get('syndicates_ids').updateValueAndValidity();
        this.formDemand.get('council_id').updateValueAndValidity();
        this.formDemand.get('legal_framework').updateValueAndValidity();
        this.formDemand.get('type').updateValueAndValidity();
        this.formDemand.get('oe_category').updateValueAndValidity();
        this.formDemand.get('oe_subcategory').updateValueAndValidity();
        this.formDemand.get('justification').updateValueAndValidity();

        if (this.formDemand.get('forwarded_to_the_technical_area.check_forwarded').value) {
            this.formDemand.get('forwarded_to_the_technical_area.emails').setValidators([Validators.required]);
        }

        this.formDemand.get('forwarded_to_the_technical_area.emails').updateValueAndValidity();
    }

    onSubmit(form) {


        this.formDemand.markAllAsTouched();

        this.validationsFormDemand();

        let alert;

        if (this.formDemand.valid) {
            this.registerDemandService = this.demandServices.setDemand(form.value).subscribe((res: any) => {
                if (res.create) {
                    alert = {
                        status: 200,
                        icon: 'check_circle',
                        color: 'success',
                        title: 'Parabéns!',
                        message: 'Demanda cadastrada com sucesso!'
                    };

                    this.alertService.alertShow(alert);

                    setTimeout(() => {
                        this.router.navigate([`/gestao-de-demandas/demanda/${res.data.id}`]);
                    }, 800);

                } else {
                    alert = {
                        status: 500,
                        message: 'Não foi possível cadastrar a demanda.',
                        title: 'Ops!',
                        icon: 'priority_high',
                        color: 'warning'
                    };

                    this.alertService.alertShow(alert);
                }

            });
        } else {

            alert = {
                status: 200,
                icon: 'priority_high',
                color: 'warning',
                title: 'Atenção!',
                message: 'Verifique os campos inválidos.',
                actions: {
                    close: true
                }
            };

            this.alertService.alertShow(alert);
        }
    }

    getUser() {
        const data = this.checkAuthorization.getUser();
        this.user = data.user;
    }

    resetForm() {
        this.formDemand.get('entity_id').setValue('');
        this.entity = '';

        this.formDemand.get('demand_category').setValue('');
        this.category = '';

        this.formDemand.get('demand_subcategory').setValue('');
        this.subcategory = '';

        this.formDemand.get('company').get('cnpj').reset('');
        this.cnpj = '';

        this.formDemand.get('company').get('name').reset('');

        this.formDemand.get('council_id').setValue('');
        this.council = '';

        this.formDemand.get('oe_category').setValue('');
        this.oeCategory = '';

        this.formDemand.get('oe_subcategory').setValue('');
        this.oeSubcategory = '';
    }

    ngOnDestroy() {
        this.entityServiceSubscribe.unsubscribe();
        this.categoryServiceSubscribe.unsubscribe();
        this.subScopeServiceSubscribe.unsubscribe();
        this.categoryEOServiceSubscribe.unsubscribe();
        this.managementsServiceSubscribe.unsubscribe();

        if (this.unionServiceSubscribe) {
            this.unionServiceSubscribe.unsubscribe();
        }

        if (this.emailsByAreasTecnicasServiceSubscribe) {
            this.emailsByAreasTecnicasServiceSubscribe.unsubscribe();
        }

        if (this.subCategoryOEServiceSubscribe) {
            this.subCategoryOEServiceSubscribe.unsubscribe();
        }

        if (this.subCategoryServiceSubscribe) {
            this.subCategoryServiceSubscribe.unsubscribe();
        }

        if (this.groupUnionServiceSubScribe) {
            this.groupUnionServiceSubScribe.unsubscribe();
        }

        if (this.advicesServiceSubscribe) {
            this.advicesServiceSubscribe.unsubscribe();
        }

        if (this.stateServiceSubscribe) {
            this.stateServiceSubscribe.unsubscribe();
        }

        if (this.cnpjChangesSubscription) {
            this.cnpjChangesSubscription.unsubscribe();
        }

        if (this.regionalsServiceSubscribe) {
            this.regionalsServiceSubscribe.unsubscribe();
        }
    }
}
