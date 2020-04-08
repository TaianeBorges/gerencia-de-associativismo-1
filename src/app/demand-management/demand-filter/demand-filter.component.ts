import {Component, OnInit, ViewChild, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {DemandService} from '../demand.service';

@Component({
    selector: 'app-demand-filter',
    templateUrl: './demand-filter.component.html',
    styleUrls: ['./demand-filter.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemandFilterComponent implements OnInit {

    @ViewChild('formDemandFilter', {static: false}) formDemandFilter;
    @Output('formOnSubmit') formOnSubmit = new EventEmitter();

    formFilter;
    filterVisibility = true;
    configEntity = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event: any) => {
            if ($event) {

                if ($event == 1 || $event == 2) {
                    this.getSectors();
                    this.getUnions();
                }

                if ($event > 3) {
                    this.getCouncils($event);
                }
            }
        }
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

    configSector = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event: any) => {
            this.getUnions($event);
        }
    };

    configRegional = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    optionsEntity = [];
    optionsRegionals = [];
    optionsUnions = [];
    optionsDemandStatus = [];
    optionsDemandCategory = [];
    optionsCouncils = [];
    optionsSector = [];


    constructor(
        private fb: FormBuilder,
        private demandService: DemandService
    ) {
    }

    ngOnInit() {
        this.formFilter = this.fb.group({
            demand_id: new FormControl(''),
            entity_id: new FormControl(''),
            demand_requester: new FormControl(''),
            syndicate_id: new FormControl(''),
            status_id: new FormControl(''),
            demand_category_id: new FormControl(''),
            council_id: [],
            sector_id: new FormControl(''),
            company_name: new FormControl(''),
            regional_id: new FormControl('')
        });

        this.getEntity();
        this.getDemandStatus();
        this.getDemandCategories();
        this.getRegionals();
    }

    getRegionals() {
        this.demandService.getRegionals().subscribe(res => {
            if (res.data) {
                this.optionsRegionals = res.data;
            }
        });
    }

    getEntity() {
        this.demandService.getEntity().subscribe(res => {
            if (res.data) {
                this.optionsEntity = res.data;
            }
        });
    }

    getUnions(sectorId?) {
        this.demandService.getUnions(sectorId).subscribe(res => {
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

    getCouncils(entityId) {
        this.demandService.getCouncils(entityId).subscribe(res => {
            if (res.data) {
                this.optionsCouncils = res.data;
            }
        });
    }

    getSectors() {
        this.demandService.getSectors().subscribe(res => {
            if (res.data) {
                this.optionsSector = res.data;
            }
        });
    }

    onSubmit(form) {
        this.formOnSubmit.emit({filters: form.value});
    }

    resetForm() {
        this.formFilter.get('entity_id').reset('');
        this.formFilter.get('demand_requester').reset('');
        this.formFilter.get('syndicate_id').reset('');
        this.formFilter.get('status_id').reset('');
        this.formFilter.get('demand_category_id').reset('');
        this.formFilter.get('sector_id').reset('');
        this.formFilter.get('company_name').reset('');
        this.formFilter.get('regional_id').reset('');

        const valuesEntity = this.optionsEntity;
        this.optionsEntity = [];

        const valuesDemandStatus = this.optionsDemandStatus;
        this.optionsDemandStatus = [];

        const valuesDemandCategory = this.optionsDemandCategory;
        this.optionsDemandCategory = [];

        const valuesRegionals = this.optionsRegionals;
        this.optionsRegionals = [];

        setTimeout(() => {
            this.optionsEntity = valuesEntity;
        }, 200);

        setTimeout(() => {
            this.optionsDemandStatus = valuesDemandStatus;
        }, 200);

        setTimeout(() => {
            this.optionsDemandStatus = valuesDemandCategory;
        }, 200);

        setTimeout(() => {
            this.optionsRegionals = valuesRegionals;
        });

        setTimeout(() => {
            this.onSubmit(this.formFilter);
        }, 200);
    }
}
