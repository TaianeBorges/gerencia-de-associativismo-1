import {Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedsService} from 'src/app/shared/shareds.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DemandService} from '../demand.service';
import {CNPJPipe} from '../../shared/pipes/cnpj.pipe';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alerts/alert.service';
import { UsersService } from 'src/app/users/users.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-demand-add',
    templateUrl: './demand-add.component.html',
    styleUrls: ['./demand-add.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemandAddComponent implements OnInit, OnDestroy {

    formDemand: FormGroup;
    user;
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

            this.formDemand.get('syndicates_ids').setValue([]);
            this.formDemand.get('sector_id').reset('');
            this.formDemand.get('council_id').reset('');
            this.formDemand.get('company').get('cnpj').reset('');
            this.formDemand.get('company').get('name').reset('');

            if ($event == 1 || $event == 2) {
                this.getUnions();
            }

            if ($event == 4 || $event == 5|| $event == 6 || $event == 7) {
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
        dropdownDirection: 'down',
        maxItems: 10
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
            this.getEmails();
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
            if($event) {
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
        private sharedService: SharedsService,
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
            entity_id: new FormControl(''),
            syndicate_permission: new FormControl(''),
            demand_category: new FormControl(''),
            demand_subcategory: new FormControl(''),
            scope: [],
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
            council_id: new FormControl(''),
            forwarded_to_the_technical_area: this.fb.group({
                regional: new FormControl(),
                managements: [],
                check_forwarded: new FormControl(false),
                emails: []
            }),
            oe_subcategory: new FormControl(''),
            oe_category: new FormControl(''),
        });

        this.userService.getUserAuthenticated().subscribe(res => {
            if (res.authenticate) {
                this.currentUser = res.user;
            }
        })

        if (this.formDemand) {
            this.getEntity();
            this.getCategories();
            this.getScope();
            this.getCategoriesOE();
            this.getManagements();
            this.getRegionals();
        }

    }

    changeCnpj(val) {
        val = this.cnpjPipe.transform(val.value);
        this.formDemand.get('company').get('cnpj').setValue(val);
        this.formDemand.get('company').get('cnpj').updateValueAndValidity();
    }


    dateChanged($event) {
        // console.log(event);
    }

    getEntity(): void {
        this.entityServiceSubscribe = this.demandServices.getEntity().subscribe(res => {
            this.optionsEntities = res.data;
        });
    }

    validatorCnpj(cnpj) {
            if(!this.testCnpj(cnpj)) {
                alert('CNPJ inválido!');
                this.formDemand.get('company.cnpj').reset('');
            }
    }

    testCnpj(cnpj) {
        
        cnpj = cnpj.replace(/[^\d]+/g,'');
        
        if(cnpj == '') return false;
        
        if (cnpj.length != 14) {
            return false;
        }

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999")
            return false;
            
        // Valida DVs
        let tamanho, numeros, digitos, soma, pos, resultado;

        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0,tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

        if (resultado != digitos.charAt(0)) {
            return false;
        }
            
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                    pos = 9;
                }
        }
        
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

        if (resultado != digitos.charAt(1)) {
            return false;
        }
            
        return true;
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
                this.optionsManagements = res.data;
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
        })
    }

    onSubmit(form) {
        this.registerDemandService = this.demandServices.setDemand(form.value).subscribe((res: any) => {
            let alert;
            if (res.create) {
                alert = {
                    status: 200,
                    icon: 'check_circle',
                    color: 'success',
                    title: 'Parabéns!',
                    message: 'Logado com sucesso.',
                    copy: false
                };

                this.router.navigate([`/gestao-de-demandas/demanda/${res.data.id}`]);

            } else {
                alert = {
                    status: 200,
                    message: res.message ? res.message : 'E-mail ou senha inválido.',
                    title: 'Ops!',
                    icon: 'priority_high',
                    color: 'warning'
                };
            }

            this.alertService.alertShow(alert);

        });
    }

    getUser() {
        const data = this.checkAuthorization.getUser();
        this.user = data.user;
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

        if (this.regionalsServiceSubscribe) {
            this.regionalsServiceSubscribe.unsubscribe();
        }
    }
}
