import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-demand-responsible',
    templateUrl: './demand-responsible.component.html',
    styleUrls: ['./demand-responsible.component.scss']
})
export class DemandResponsibleComponent implements OnInit, OnChanges {

    @ViewChild('modal', {static: false}) modal;
    @Input('demandSelected') demandSelected: any;
    @Input('openModal') openModal: boolean;
    modalRef: BsModalRef;
    optionsRelationship = [
        {id: 1, name: 'Arthur Adriano Pinheiro', email: 'aapinheiro@firjan.com.br'}
    ];
    optionsTechnicalArea = [];
    optionsTechnicalAreas = [];
    formResponsible: FormGroup;
    configResponsible = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event: any) => {
        }
    };
    configTechnicalArea = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event: any) => {
        }
    };
    configTechnicalAreas = {
        labelField: 'initial',
        valueField: 'id',
        create: false,
        searchField: ['initial', 'name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 100,
        onChange: ($event: any) => {
        }
    };

    constructor(
        private modalService: BsModalService,
        private fb: FormBuilder) {
        this.formResponsible = this.fb.group({
            relationship: new FormControl([]),
            technical_area: new FormControl([]),
            technical_areas: new FormControl([])
        });
    }

    ngOnInit() {
    }

    open() {

        this.resetForm();

        if (this.demandSelected) {

            this.modalRef = this.modalService.show(this.modal, {class: 'modal-md modal-dialog-centered modal-demand-responsible'});

            this.optionsTechnicalAreas.push(this.demandSelected.demands_managements);

            const technicalAreasId = [];

            this.demandSelected.demands_managements.map((item) => {
                technicalAreasId.push(item.id);
            });

            setTimeout(() => {
                this.formResponsible.get('technical_areas').setValue(technicalAreasId);

                this.formResponsible.get('technical_areas').updateValueAndValidity();
            }, 500);

        }
    }

    resetForm() {
        this.formResponsible.reset();
    }

    ngOnChanges(changes: any) {

        if (changes && changes.openModal) {
            this.open();
        }
    }

    onSubmit() {
        if (this.formResponsible.valid) {
            console.log('foi');
        }
    }
}
