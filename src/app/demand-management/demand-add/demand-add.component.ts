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
        dropdownDirection: 'down'
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
        labelField: 'nome',
        valueField: 'id',
        create: false,
        searchField: ['nome'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    optionsForwardEmails = [];
    configForwardEmails = {
        labelField: 'nome',
        valueField: 'id',
        create: false,
        searchField: ['nome'],
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
            this.getUnions();
            this.getCategories();
            this.getScope();
            this.getCategoriesOE();
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
        this.unionServiceSubscribe.unsubscribe();
        this.categoryServiceSubscribe.unsubscribe();
        this.subScopeServiceSubscribe.unsubscribe();
        this.categoryEOServiceSubscribe.unsubscribe();

        if (this.subCategoryOEServiceSubscribe) {

            this.subCategoryOEServiceSubscribe.unsubscribe();
        }

        if (this.subCategoryServiceSubscribe) {
            this.subCategoryServiceSubscribe.unsubscribe();
        }
    }
}
