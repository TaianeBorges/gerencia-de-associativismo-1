import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {DemandService} from '../demand.service';

@Component({
    selector: 'app-demand-filter',
    templateUrl: './demand-filter.component.html',
    styleUrls: ['./demand-filter.component.scss']
})
export class DemandFilterComponent implements OnInit {

    @ViewChild('formDemandFilter', {static: false}) formDemandFilter;
    @ViewChild('entity', {static: false}) entity;
    @ViewChild('requester', {static: false}) cadastrante;
    @ViewChild('syndicates', {static: false}) syndicates;
    @ViewChild('status', {static: false}) status;
    @ViewChild('categories', {static: false}) categories;
    @ViewChild('sector', {static: false}) sector;
    @ViewChild('council', {static: false}) council;

    @Output('formOnSubmit') formOnSubmit = new EventEmitter();

    formFilter;
    filterVisibility = true;
    configEntity = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };
    configUnions = {
        labelField: 'initial',
        valueField: 'id',
        create: false,
        searchField: ['name', 'initial'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };
    configDemandStatus = {
        labelField: 'label',
        valueField: 'id',
        create: false,
        searchField: ['label'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };
    configDemandCategory = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    configCouncils = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    optionsEntity = [];
    optionsUnions = [];
    optionsDemandStatus = [];
    optionsDemandCategory = [];
    optionsCouncils = [];


    constructor(
        private fb: FormBuilder,
        private demandService: DemandService
    ) {
    }

    ngOnInit() {
        this.formFilter = this.fb.group({
            entity_id: new FormControl(''),
            demand_requester: new FormControl(''),
            syndicate_id: new FormControl(''),
            status_id: new FormControl(''),
            demand_id: new FormControl(''),
            demand_category_id: new FormControl(''),
            council_id: []
        });

        this.getEntity();
        this.getUnions();
        this.getDemandStatus();
        this.getDemandCategories();
        this.getCouncils();
    }

    getEntity() {
        this.demandService.getEntity().subscribe(res => {
            if (res.data) {
                this.optionsEntity = res.data;
            }
        });
    }

    getUnions() {
        this.demandService.getUnions().subscribe(res => {
            if (res.data) {
                this.optionsUnions = res.data;
            }
        });
    }

    getDemandStatus() {
        this.demandService.getDemandStatus().subscribe(res => {
            if (res.data) {
                this.optionsDemandStatus = res.data;
            }
        });
    }

    getDemandCategories() {
        this.demandService.getDemandCategories().subscribe(res => {
            if (res.data) {
                this.optionsDemandCategory = res.data;
            }
        });
    }

    getCouncils() {
        this.demandService.getCouncils().subscribe(res => {
            if (res.data) {
                this.optionsCouncils = res.data;
            }
        });
    }

    onSubmit(form) {
        this.formOnSubmit.emit({filters: form.value});
    }

    resetForm() {
        this.entity = '';
        this.cadastrante = '';
        this.syndicates = '';
        this.status = '';
        this.categories = '';
        this.council = '';
    }
}
