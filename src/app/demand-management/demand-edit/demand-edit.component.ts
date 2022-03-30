import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {DemandService} from '../demand.service';
import {SharedService} from '../../shared/shared.service';
import {AlertService} from '../../shared/alerts/alert.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-demand-edit',
    templateUrl: './demand-edit.component.html',
    styleUrls: ['./demand-edit.component.scss']
})
export class DemandEditComponent implements OnInit, OnDestroy {

    demandId: number;
    demand: any;
    total = 0;
    currentUser;
    timePeriod;
    destroyDemandServiceSubscribe: Subscription;
    formDemand: FormGroup;
    registerDemandService: Subscription;
    categoryServiceSubscribe: Subscription;
    subCategoryServiceSubscribe: Subscription;
    category;
    subcategory;

    optionsCategory = [];
    configCategory = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down',
        onChange: ($event: any) => {
            this.subcategory = '';
            this.getSubcategories($event);
        }
    };

    optionsSubcategory = [];
    configSubcategory = {
        labelField: 'name',
        valueField: 'id',
        create: false,
        searchField: ['name'],
        plugins: ['dropdown_direction', 'remove_button'],
        dropdownDirection: 'down'
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private demandServices: DemandService,
        private sharedService: SharedService,
        private alertService: AlertService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.demandId = parseInt(this.route.snapshot.paramMap.get('demandaId'));

        if (this.demandId) {

            this.getDemand(this.demandId);

            this.formDemand = this.fb.group({
                id: new FormControl(''),
                requester: new FormGroup({
                    name: new FormControl('', [Validators.required]),
                    last_name: new FormControl('', [Validators.required]),
                    email: new FormControl([], [Validators.required])
                }),
                description: new FormControl('', [Validators.required]),
                theme: new FormControl(''),
                themeNew: new FormControl(''),
                // demand_category: new FormControl('', [Validators.required]),
                // demand_subcategory: new FormControl('', [Validators.required])
            });
        }

        this.currentUser = JSON.parse(localStorage.getItem('user'));
    }

    getDemand(id: number) {
        this.demandServices.getDemand(id)
            .subscribe(res => {

                if (res && res.permission && (res.data[0].histories[res.data[0].histories.length - 1].user_id == this.currentUser.user.id || this.currentUser.user.role === 10)) {
                    this.sharedService.setTitle(`Demanda #${this.demandId} <p matTooltip="${res.data[0].histories[0].status_label}" class="badge background-status-${res.data[0].histories[0].status}">${res.data[0].histories[0].status_label}</p>`);

                    this.demand = res.data[0];

                    this.formDemand.get('id').setValue(res.data[0].id);
                    this.formDemand.get('requester.name').setValue(res.data[0].demand_requester.name);
                    this.formDemand.get('requester.last_name').setValue(res.data[0].demand_requester.last_name);
                    this.formDemand.get('requester.email').setValue(res.data[0].demand_requester.demand_requesters_emails[0].email);
                    this.formDemand.get('description').setValue(res.data[0].description);
                    this.formDemand.get('theme').setValue(res.data[0].theme);
                    this.formDemand.get('themeNew').setValue(res.data[0].themeNew);

                    // this.getCategories(true);


                    this.demand.histories.forEach(element => {
                        if (element.cost) {
                            this.total = this.total + parseFloat(element.cost);
                        }

                        if (element.time_period) {
                            this.timePeriod = element.time_period;
                        }
                    });
                } else {
                    this.router.navigate(['nao-autorizado']);
                }
            });
    }

    getCategories(first): void {
        this.categoryServiceSubscribe = this.demandServices.getDemandCategories().subscribe(res => {
            this.optionsCategory = res.data;

            if (first) {

                this.category = this.demand.demand_subcategory.demand_category.id;
                this.formDemand.get('demand_category').setValue(this.demand.demand_subcategory.demand_category.id);
                this.formDemand.get('demand_category').updateValueAndValidity();

                setTimeout(() => {
                    this.getSubcategories(this.demand.demand_subcategory.demand_category.id, true);
                }, 800);
            }
        });
    }

    getSubcategories(id: any, first: boolean = false): void {
        if (id) {
            this.subCategoryServiceSubscribe = this.demandServices.getDemandSubcategories(id).subscribe(res => {
                this.optionsSubcategory = res.data;

                if (first) {
                    this.subcategory = this.demand.demand_subcategory.id;
                    this.formDemand.get('demand_subcategory').setValue(this.demand.demand_subcategory.id);
                    this.formDemand.get('demand_subcategory').updateValueAndValidity();
                }
            });
        }
    }

    onSubmit(form) {

        this.formDemand.markAllAsTouched();
        let alert;

        if (this.formDemand.valid) {
            this.registerDemandService = this.demandServices.updateDemand(form.value).subscribe((res: any) => {

                alert = {
                    status: 200,
                    icon: 'check_circle',
                    color: 'success',
                    title: 'Parabéns!',
                    message: 'Demanda atualizada com sucesso!'
                };

                this.alertService.alertShow(alert);

                setTimeout(() => {
                    this.router.navigate(['/gestao-de-demandas/demanda/', this.formDemand.get('id').value]);
                }, 800);
            });
        } else {

            alert = {
                status: 200,
                icon: 'priority_high',
                color: 'warning',
                title: 'Atenção!',
                message: 'Verifique os campos inválidos.',
                actions: {
                    close: true
                }
            };

            this.alertService.alertShow(alert);
        }
    }

    destroyDemand() {
        if (confirm('Tem certeza que deseja excluir esta demanda?')) {
            this.destroyDemandServiceSubscribe = this.demandServices.destroyDemand({demand_id: this.demand.id}).subscribe(res => {

                const alert = {
                    status: 200,
                    icon: 'check_circle',
                    color: 'success',
                    title: 'Parabéns!',
                    message: 'Demanda excluida com sucesso!'
                };

                this.alertService.alertShow(alert);

                setTimeout(() => {
                    this.router.navigate([`/gestao-de-demandas/lista-de-demandas`]);
                }, 800);

            });

        }
    }

    ngOnDestroy() {
        // this.categoryServiceSubscribe.unsubscribe();
        // this.subCategoryServiceSubscribe.unsubscribe();

        if (this.destroyDemandServiceSubscribe) {
            this.destroyDemandServiceSubscribe.unsubscribe();
        }
    }

}
