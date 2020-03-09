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

    optionsEntity = [];
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
            company_name: new FormControl('')
        });

        this.getEntity();
        this.getDemandStatus();
        this.getDemandCategories();
    }

    getEntity() {
        this.demandService.getEntity().subscribe(res => {
            if (res.data) {
                this.optionsEntity = res.data;
            }
        });
    }

    getUnions(sector_id?) {
        this.demandService.getUnions(sector_id).subscribe(res => {
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

    getCouncils(entity_id) {
        this.demandService.getCouncils(entity_id).subscribe(res => {
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
        })
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
       
        this.onSubmit(this.formFilter);
        
    }
}
