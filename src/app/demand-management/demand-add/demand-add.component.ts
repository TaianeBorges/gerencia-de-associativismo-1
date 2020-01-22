import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedsService } from 'src/app/shared/shareds.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DemandService } from '../demand.service';

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
        labelField: 'nome',
        valueField: 'id',
        create: false,
        searchField: ['nome'],
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
        labelField: 'sigla',
        valueField: 'id',
        create: false,
        searchField: ['sigla', 'nome'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 100
    };

    optionsCategory = [];
    configCategory = {
        labelField: 'nome',
        valueField: 'id',
        create: false,
        searchField: ['nome'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event: any) => {
            this.subCategory = '';
            this.getSubcategories($event);
        }
    };

    configSectorGroup = {
        labelField: 'nome',
        valueField: 'id',
        create: false,
        searchField: ['nome'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };
    optionsSectorGroup = [];

    optionsSubcategory = [];
    configSubcategory = {
        labelField: 'nome',
        valueField: 'id',
        create: false,
        searchField: ['nome'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    optionsCategoryOE = [];
    configCategoryOE = {
        labelField: 'nome',
        valueField: 'id',
        create: false,
        searchField: ['nome'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event: any) => {
            this.subCategoryEO = '';

            this.getSubcategoriesOE($event);
        }
    };

    optionsSubcategoryOE = [];
    configSubcategoryOE = {
        labelField: 'nome',
        valueField: 'id',
        create: false,
        searchField: ['nome'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    optionsAdvices = [];
    configAdvices = {
        labelField: 'nome',
        valueField: 'id',
        create: false,
        searchField: ['nome'],
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

    optionsAreas = [];
    configAreas = {
        labelField: 'sigla',
        valueField: 'id',
        create: false,
        searchField: ['sigla'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 100,
        onBlur: () => {
            this.getEmailsByAreasTecnicas()
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
                    <span class="nome">${escape(data.name)}</span> -
                    <span class="sigla"><b>${escape(data.email)}</b></span>
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
    areasServiceSubscribe: Subscription;
    emailsByAreasTecnicasServiceSubscribe: Subscription;
    groupUnionServiceSubScribe: Subscription;
    advicesServiceSubscribe: Subscription;
    stateServiceSubscribe: Subscription;

    constructor(
        private sharedService: SharedsService,
        private fb: FormBuilder,
        private demandServices: DemandService,
        private el: ElementRef
    ) {
    }

    ngOnInit() {
        this.sharedService.setTitle(`Nova Demanda`);

        this.formDemand = this.fb.group({
            cadastrante: new FormGroup({
                nome: new FormControl('', [Validators.required]),
                sobrenome: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required])
            }),
            entidade_id: new FormControl(''),
            categoria_demanda: new FormControl(''),
            subcategoria_demanda: new FormControl(''),
            escopo: new FormControl(''),
            empresa_associada: new FormGroup({
                cnpj: new FormControl(''),
                nome_fantasia: new FormControl('')
            }),
            prazo: new FormControl(''),
            descricao: new FormControl(''),
            sindicato_id: [],
            setor_sindicato: new FormControl(),
            poder_publico: this.fb.group({
                ambito: new FormControl(),
                tipo: new FormControl()
            }),
            empresa: this.fb.group({
                cnpj: new FormControl(),
                razao_social: new FormControl()
            }),
            conselhos: [],
            encaminhamento: this.fb.group({
                areas_envolvidas: [],
                encaminhar_check: new FormControl(false),
                emails: []
            }),
            subcategoria_oe: new FormControl(''),
            categoria_oe: new FormControl(''),
        });

        if (this.formDemand) {
            this.getEntity();
            this.getCategories();
            this.getScope();
            this.getCategoriesOE();
            this.getAreasTecnicas();
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
        })
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

    getAreasTecnicas() {
        this.areasServiceSubscribe = this.demandServices.getAreasTecnicas().subscribe(res => {
            if (res)
                this.optionsAreas = res.data;
        })
    }

    getEmailsByAreasTecnicas() {
        const data = this.formDemand.get('encaminhamento.areas_envolvidas').value;

        if (data) {
            this.emailsByAreasTecnicasServiceSubscribe = this.demandServices.getEmailsByAreasTecnicas(data).subscribe(res => {
                if (res)
                    this.optionsForwardEmails = res.data;
            })
        }

    }

    getAdvices(data) {
        if (data) {
            this.advicesServiceSubscribe = this.demandServices.getAdvices(data).subscribe(res => {
                if (res) {
                    this.optionsAdvices = res.data;
                }
            })
        }
    }

    getState() {
        this.stateServiceSubscribe = this.demandServices.getState().subscribe(res => {
            if (res) {
                this.optionsAmbito = res.data.ambito;
                this.optionsTipo = res.data.tipo;
            }
        })
    }

    onSubmit(form) {
        console.log(form.value);
        this.registerDemandService = this.demandServices.setDemand(form.value).subscribe(res => {
            console.log(res);
        })
    }

    resetForm() {
    }

    ngOnDestroy() {
        this.entityServiceSubscribe.unsubscribe();
        this.categoryServiceSubscribe.unsubscribe();
        this.subScopeServiceSubscribe.unsubscribe();
        this.categoryEOServiceSubscribe.unsubscribe();
        this.areasServiceSubscribe.unsubscribe();

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
    }
}
