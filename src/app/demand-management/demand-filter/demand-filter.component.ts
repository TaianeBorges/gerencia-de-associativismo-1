import {Component, OnInit, ViewChild, Output, EventEmitter, ViewEncapsulation, TemplateRef} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {DemandService} from '../demand.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-demand-filter',
    templateUrl: './demand-filter.component.html',
    styleUrls: ['./demand-filter.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemandFilterComponent implements OnInit {

    @Output('formOnSubmit') formOnSubmit = new EventEmitter();
    filterModal: BsModalRef;

    selectStatus;
    selectEntity;
    selectCategory;
    selectSector;
    selectSyndicates;
    selectCouncil;
    formFilter;
    filterVisibility = true;
    configEntity = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: () => {
            let entity;

            setTimeout(() => {
                entity = +this.selectEntity;

                if (entity !== 1 && entity !== 2) {
                    this.selectSyndicates = [];
                    this.selectSector = [];
                }

                if (entity !== 3) {
                    this.formFilter.get('company_name').reset('');
                }

                if (entity !== 4 &&
                    entity !== 5 &&
                    entity !== 6 &&
                    entity !== 7 &&
                    entity !== 9) {
                    this.selectCouncil = [];
                }

            }, 200);
        },
        onBlur: () => {
            setTimeout(() => {
                if (this.selectEntity == 1 || this.selectEntity == 2) {
                    this.getSectors();
                    this.getUnions();
                }

                if (this.selectEntity > 3 && this.selectEntity != 8) {
                    this.getCouncils(this.selectEntity);
                }
            }, 200);
        }
    };
    configUnions = {
        labelField: 'initial',
        valueField: 'id',
        create: false,
        searchField: ['name', 'initial'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 30
    };
    configDemandStatus = {
        labelField: 'label',
        valueField: 'id',
        create: false,
        searchField: ['label'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 30
    };
    configDemandCategory = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 30
    };

    configCouncils = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 30
    };

    configSector = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event: any) => {
        },
        onBlur: () => {
            this.getUnions(this.selectSector);
        },
        maxItems: 30
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
    currentUser;

    constructor(
        private fb: FormBuilder,
        private demandService: DemandService,
        private modalService: BsModalService
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
            regional_id: new FormControl(''),
            page: new FormControl(1),
            theme: new FormControl('')
        });

        this.getEntity();
        this.getDemandStatus();
        this.getDemandCategories();
        this.getRegionals();

        this.currentUser = JSON.parse(localStorage.getItem('user'));
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

    onSubmit() {
        this.filterModal.hide();
        this.formOnSubmit.emit({filters: this.formFilter.value});
    }

    resetForm() {
        this.formFilter.get('demand_id').reset('');
        this.formFilter.get('entity_id').reset('');
        this.formFilter.get('demand_requester').reset('');
        this.formFilter.get('syndicate_id').reset('');
        this.formFilter.get('status_id').reset('');
        this.formFilter.get('demand_category_id').reset('');
        this.formFilter.get('sector_id').reset('');
        this.formFilter.get('company_name').reset('');
        this.formFilter.get('regional_id').reset('');
        this.formFilter.get('theme').reset('');

        const valuesEntity = this.optionsEntity;
        this.optionsEntity = [];

        const valuesDemandStatus = this.optionsDemandStatus;
        this.optionsDemandStatus = [];

        const valuesDemandCategory = this.optionsDemandCategory;
        this.optionsDemandCategory = [];

        const valuesRegionals = this.optionsRegionals;
        this.optionsRegionals = [];

        this.selectStatus = [];
        this.selectCategory = [];
        this.selectSector = [];
        this.selectSyndicates = [];
        this.selectCouncil = [];

        setTimeout(() => {
            this.optionsEntity = valuesEntity;
        }, 200);

        setTimeout(() => {
            this.optionsDemandStatus = valuesDemandStatus;
        }, 200);

        setTimeout(() => {
            this.optionsDemandCategory = valuesDemandCategory;
        }, 200);

        setTimeout(() => {
            this.optionsRegionals = valuesRegionals;
        });

        setTimeout(() => {
            this.onSubmit();
        }, 200);

        this.filterModal.hide();
    }

    openFilter(template: TemplateRef<any>) {
        this.filterModal = this.modalService.show(template);
    }

    closeModal() {
        this.filterModal.hide();
    }
}
