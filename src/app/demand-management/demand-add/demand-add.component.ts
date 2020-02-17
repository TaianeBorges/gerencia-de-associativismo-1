import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SharedsService} from 'src/app/shared/shareds.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DemandService} from '../demand.service';
import {CNPJPipe} from '../../shared/pipes/cnpj.pipe';

@Component({
    selector: 'app-demand-add',
    templateUrl: './demand-add.component.html',
    styleUrls: ['./demand-add.component.scss']
})
export class DemandAddComponent implements OnInit, OnDestroy {

    formDemand: FormGroup;
    subCategory;
    subCategoryEO;
    optionsEntities = [];
    configEntities = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event) => {
            if ($event == 1 || $event == 2) {
                this.getUnions();
            }

            if ($event == 5) {
                this.getSectorGroup();
            }

            if ($event == 4 || $event == 6 || $event == 7) {
                this.getAdvices($event);
            }

            if ($event == 8) {
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
            this.subCategory = '';
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
        dropdownDirection: 'down'
    };

    optionsManagements = [];
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

    optionsForwardEmails = [];
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

    optionState = [];

    optionsAmbito = [];
    configAmbito = {
        labelField: 'label',
        valueField: 'id',
        create: false,
        searchField: ['label'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    optionsTipo = [];
    configTipo = {
        labelField: 'label',
        valueField: 'id',
        create: false,
        searchField: ['label'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };


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

    constructor(
        private sharedService: SharedsService,
        private fb: FormBuilder,
        private demandServices: DemandService,
        private el: ElementRef,
        private cnpjPipe: CNPJPipe
    ) {
    }

    ngOnInit() {
        this.sharedService.setTitle(`Nova Demanda`);

        this.formDemand = this.fb.group({
            requester: new FormGroup({
                name: new FormControl('', [Validators.required]),
                last_name: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required])
            }),
            entity_id: new FormControl(''),
            syndicate_permission: new FormControl(''),
            demand_category: new FormControl(''),
            demand_subcategory: new FormControl(''),
            scope: new FormControl(''),
            company: new FormGroup({
                cnpj: new FormControl(''),
                name: new FormControl('')
            }),
            time_period: new FormControl(''),
            description: new FormControl(''),
            syndicates_ids: [],
            sector_id: new FormControl(),
            legal_framework: new FormControl(),
            type: new FormControl(),
            councils: [],
            forwarded_to_the_technical_area: this.fb.group({
                managements: [],
                check_forwarded: new FormControl(false),
                emails: []
            }),
            oe_subcategory: new FormControl(''),
            oe_category: new FormControl(''),
        });

        if (this.formDemand) {
            this.getEntity();
            this.getCategories();
            this.getScope();
            this.getCategoriesOE();
            this.getManagements();
        }

        if (this.formDemand) {
            this.cnpjChangesSubscription = this.formDemand.get('company').get('cnpj').valueChanges.subscribe((res: string) => {
                if (res && res.length) {
                    // const val = this.cnpjPipe.transform(res);
                    // console.log(val);
                    // this.formDemand.get('empresa').get('cnpj').setValue(val);
                    // this.formDemand.get('empresa').get('cnpj').updateValueAndValidity();
                }
            });
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
                this.optionsManagements = res.data;
            }
        });
    }

    getEmailsByManagements() {
        const data = this.formDemand.get('forwarded_to_the_technical_area.managements').value;

        if (data) {
            this.emailsByAreasTecnicasServiceSubscribe = this.demandServices.getEmailsByManagements(data).subscribe(res => {
                if (res)
                    this.optionsForwardEmails = res.data;
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
            if (res) {
                this.optionsAmbito = res.data.ambito;
                this.optionsTipo = res.data.tipo;
            }
        });
    }

    onSubmit(form) {
        console.log(form.value);
        this.registerDemandService = this.demandServices.setDemand(form.value).subscribe(res => {
            console.log(res);
        });
    }

    resetForm() {
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
    }
}
