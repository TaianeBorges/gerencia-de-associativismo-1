import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../users.service';
import * as jQuery from 'jquery';
import {callbackify} from 'util';
import {AlertService} from 'src/app/shared/alerts/alert.service';
import {AuthService} from 'src/app/auth/auth.service';

declare const $: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
    formRegister: any;
    unidadeSelect: any;
    selectRegional: any;
    selectCargo: any;
    permissionOffice = true;
    @ViewChild('selectizeSector', {static: false}) selectizeSector;

    configRegional = {
        labelField: 'nome',
        valueField: 'id',
        create: false,
        searchField: ['nome'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 20,
        onChange: ($event: any) => {
            // this.getUnions($event);
        },
        onBlur: () => {
        }
    };

    configSyndicates = {
        labelField: 'initial',
        valueField: 'id',
        create: false,
        searchField: ['name', 'initial'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 200
    };

    permissionManagements = true;

    configSyndicateSectors = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'up',
        maxItems: 200,
        onBlur: () => {
            if (this.selectizeSector.value.length)
                this.getSyndicatesBySectors(this.selectizeSector.value);
        }
    };

    configManagement = {
        labelField: 'initial',
        valueField: 'id',
        create: false,
        searchField: ['name', 'initial'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        maxItems: 200,
        onBlur: () => {
            this.getDepartments();
        },
        onChange: ($event: any) => {
            this.permissionManagements = !($event.length > 1);
        },
        render: {
            option(data: any, escape: any) {
                return '<div class="option">' +
                    '<span class="initial"><b>' + escape(data.initial) + '</b></span>' +
                    '<span class="name"> - ' + escape(data.name) + '</span>' +
                    '</div>';
            },
            item(data: any, escape: any) {
                return '<div class="item">' + escape(data.initial) + '</div>';
            }
        }
    };

    configSyndicatesSectors = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'up',
        maxItems: 200,
        onBlur: () => {
            if (this.selectizeSector.value.length)
                this.getSyndicatesBySectors(this.selectizeSector.value);
        }
    };

    optionsSectorGroup = [];
    optionsCapacity = [];
    optionRegional = [];
    optionManagement = [];
    optionDepartments = [];
    optionsSyndicates = [];
    optionsSyndicatesSectors = [];

    optionOffices = [
        {id: 1, name: 'Gerente'},
        {id: 2, name: 'Coordenador'},
        {id: 3, name: 'Executivo'}
    ];
    offices = [];
    optionGeneralManagement = [];

    constructor(
        private userService: UsersService,
        private fb: FormBuilder,
        private alertService: AlertService,
        private router: Router,
        private authService: AuthService) {
    }

    ngOnInit() {

        this.formRegister = this.fb.group({
            name: new FormControl('', [Validators.minLength(4), Validators.required]),
            email: new FormControl('', [Validators.minLength(4), Validators.required, Validators.email]),
            telephone: new FormControl('', [Validators.minLength(14), Validators.required]),
            capacity_id: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.minLength(4), Validators.required]),
            password: new FormControl('', [Validators.minLength(4), Validators.required]),
            confirmPassword: new FormControl('', [Validators.minLength(4), Validators.required]),
            general_management_id: new FormControl(''),
            management_id: new FormControl(''),
            department_id: new FormControl(''),
            relationship: this.fb.group({
                check_relationship: false,
                check_industry_relationship: false,
                regionals: [],
                syndicates: [],
                syndicates_sectors: []
            }),
            offices: [],
            regional_representation: this.fb.group({
                regional: '',
                office: ''
            })
        });

        if (this.formRegister) {
            this.getCapacities();
            this.getRegionals();
        }
    }

    resetValidations() {
        const representanteRegional = this.formRegister.get('regional_representation.regional');
        const representanteCargo = this.formRegister.get('regional_representation.office');
        const general_management_id = this.formRegister.get('general_management_id');

        general_management_id.clearValidators();
        general_management_id.updateValueAndValidity();
        representanteRegional.clearValidators();
        representanteRegional.updateValueAndValidity();
        representanteCargo.clearValidators();
        representanteCargo.updateValueAndValidity();
    }

    addOffice(data: any) {

        const reg = this.optionRegional[data[0] - 1];
        const office = this.optionOffices[data[1] - 1];

        this.offices.push({
            regional: {
                id: reg.id,
                name: reg.name,
            },
            office: {
                id: office.id,
                name: office.name
            }
        });

        this.formRegister.get('offices').patchValue(this.offices);

        this.selectCargo = '';
        this.selectRegional = '';

        this.permissionOffice = !(office.name === 'Executivo');
    }

    trackByFn(index, item) {
        return (item.id);
    }

    removeOffice(i: number) {
        this.offices.splice(i, 1);

        this.permissionOffice = !!(this.optionOffices.length);
    }

    matchValues(group: FormGroup) {
        const password = group.get('password').value;
        const confirmPassword = group.get('confirmPassword').value;
        const validation = password !== confirmPassword ? {confirmPass: true} : confirmPassword.length < 4 ? {minLength: true} : null;

        return this.formRegister.get('confirmPassword').setErrors(validation);
    }

    onSubmit(data: FormGroup) {
        this.formRegister.markAllAsTouched();

        if (this.formRegister.get('capacity_id').value && parseInt(this.formRegister.get('capacity_id').value) === 2) {
            this.validateRepresentanteRegional();
        } else {
            this.validateSede();
        }

        let dataAlert = {};

        if (data.valid) {
            this.userService.registerUser(data.value).subscribe(res => {
                if (!res.status) {
                    dataAlert = {
                        status: 200,
                        icon: 'check_circle',
                        color: 'success',
                        title: 'Parab??ns!',
                        message: 'Cadastrado com sucesso.',
                        copy: false
                    };

                    this.formRegister.reset();
                    // this.authService.storeAuthorizationToken(res.token);

                    this.alertService.alertShow(dataAlert);

                    this.router.navigate(['/auth/login']);

                    // setTimeout(() => {
                    //     this.alertService.hide();
                    // }, 1000);
                }
            });
        }
    }

    getCapacities() {
        this.userService.getCapacities().subscribe(res => {
            if (res.data) {
                this.optionsCapacity = res.data;
            }
        });
    }

    getGeneralManagement() {
        const id = this.formRegister.get('capacity_id').value;
        if (id && this.optionsCapacity[id - 1].nome !== 'Representante Regional') {
            this.userService.getGeneralManagement(id).subscribe(res => {
                if (res.data) {
                    this.optionGeneralManagement = res.data;

                    if (res.data.length === 1) {
                        this.formRegister.get('general_management_id').setValue(res.data[0].id);
                        this.getManagements();
                    }
                }
            });
        } else {
            this.formRegister.get('general_management_id').clearValidators();
            this.formRegister.get('general_management_id').updateValueAndValidity();
        }
    }

    getSectors() {
        const id = this.formRegister.get('capacity_id').value;
        if (id && this.optionsCapacity[id - 1].nome !== 'Representante Regional') {
            this.userService.getSectorsService().subscribe(res => {
                this.optionsSyndicatesSectors = res.data;
            });
        }
    };

    getManagements() {
        const data = {
            capacity_id: this.formRegister.get('capacity_id').value,
            general_management_id: this.formRegister.get('general_management_id').value
        };

        if (data.capacity_id && data.general_management_id) {
            this.userService.getManagements(data).subscribe(res => {
                if (res.data) {
                    this.optionManagement = res.data;

                    if (res.data.length === 1) {
                        setTimeout(() => {
                            this.formRegister.get('management_id').setValue(res.data[0].id);

                            if (this.formRegister.get('management_id').value && this.formRegister.get('management_id').value.length === 1) {
                                this.permissionManagements = true;
                                this.getDepartments();
                            }
                        }, 500);
                    }
                }
            });
        }
    }

    getRegionals() {
        this.userService.getRegionals().subscribe(res => {
            if (res.data) {
                this.optionRegional = res.data;
            }
        });
    }

    getDepartments() {
        const data = {
            capacity_id: this.formRegister.get('capacity_id').value,
            general_management_id: this.formRegister.get('general_management_id').value,
            management_id: this.formRegister.get('management_id').value
        };

        if (data.capacity_id && data.general_management_id && this.formRegister.get('management_id').value.length === 1) {
            this.offices = [];

            this.userService.getDepartments(data).subscribe(res => {
                if (res.data) {
                    this.optionDepartments = res.data;
                    if (res.data.length === 1) {
                        this.formRegister.get('department_id').setValue(res.data[0].id);
                    }
                }
            });
        }
    }

    getSyndicatesBySectors(sectors) {
        const data = {
            sectors: sectors
        };

        let filter = [];

        this.userService.getSyndicatesBySectors(data).subscribe(res => {

            if (res) {
                this.optionsSyndicates = res.data;

                for (let item of res.data) {
                    filter.push(item.id);
                }

                if (res.data.length)
                    setTimeout(() => {
                        this.formRegister.get('relationship.syndicates').setValue(filter);
                    }, 1000);
            }
        });
    }

    validateRepresentanteRegional() {
        const representanteRegional = this.formRegister.get('regional_representation.regional');
        const regionalId = this.formRegister.get('capacity_id').value;
        const representanteCargo = this.formRegister.get('regional_representation.office');
        const validateRegional = regionalId && regionalId !== '1';

        if (validateRegional && !representanteRegional.value && !this.offices.length) {
            representanteRegional.setErrors({required: true});
        } else if (representanteRegional) {
            representanteRegional.clearValidators();
            representanteRegional.updateValueAndValidity();
        }

        if (validateRegional && !representanteCargo.value && !this.offices.length) {
            representanteCargo.setErrors({required: true});
        } else if (representanteRegional) {
            representanteCargo.clearValidators();
            representanteCargo.updateValueAndValidity();
        }

        if (representanteCargo.value && representanteRegional.value && !this.offices.length) {
            alert('Adicione os offices!');
        }
    }

    validateSede() {
        // const relationship_regionals = this.formRegister.get('relationship.regionals');
        // const relationship_syndicates = this.formRegister.get('relationship.syndicates');
        const capacity_id = this.formRegister.get('capacity_id');
        const depatment_id = this.formRegister.get('department_id');
        const management_id = this.formRegister.get('management_id');
        const general_management_id = this.formRegister.get('general_management_id');

        if (capacity_id.value && capacity_id.value === '1' && !general_management_id.value.length) {
            general_management_id.setErrors({required: true});
        } else {
            general_management_id.clearValidators();
            general_management_id.updateValueAndValidity();
        }

        // if (capacity_id.value && capacity_id.value === '1' && !management_id.value.length) {
        //     management_id.setErrors({required: true});
        // } else {
        //     management_id.updateValueAndValidity();
        // }

        // if (capacity_id.value && capacity_id.value === '1' && !depatment_id.value) {
        //     depatment_id.setErrors({required: true});
        // } else {
        //     depatment_id.updateValueAndValidity();
        // }
    }
}
