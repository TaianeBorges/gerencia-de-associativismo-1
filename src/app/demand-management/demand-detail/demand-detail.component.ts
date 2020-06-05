import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DemandService} from '../demand.service';
import {SharedsService} from 'src/app/shared/shareds.service';
import {Subscription} from 'rxjs';
import {AlertService} from '../../shared/alerts/alert.service';

@Component({
    selector: 'app-demand-detail',
    templateUrl: './demand-detail.component.html',
    styleUrls: ['./demand-detail.component.scss']
})
export class DemandDetailComponent implements OnInit, OnDestroy {

    demandId: number;
    demand: any;
    demandAddSelected: any;
    openModalAddHistory: any;
    openModal: any;
    total = 0;
    currentUser;
    timePeriod;
    destroyDemandServiceSubscribe: Subscription;
    permissionUpdateDemand = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private demandService: DemandService,
        private sharedService: SharedsService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(routeParams => {
            if (routeParams.demandaId) {
                this.demandId = routeParams.demandaId;
                this.getDemand(this.demandId);
            }
        });

        this.currentUser = JSON.parse(localStorage.getItem('user'));
    }

    getDemand(id: number) {
        this.demandService.getDemand(id)
            .subscribe(res => {
                if (res && res.permission) {
                    this.sharedService.setTitle(`Demanda #${this.demandId} <p matTooltip="${res.data[0].histories[0].status_label}" class="badge background-status-${res.data[0].histories[0].status}">${res.data[0].histories[0].status_label}</p>`);

                    this.total = 0;
                    this.demand = res.data[0];

                    this.demand.histories.forEach(element => {
                        if (element.cost) {
                            this.total = this.total + parseFloat(element.cost);
                        }

                        if (element.time_period) {
                            this.timePeriod = element.time_period;
                        }
                    });

                    this.getPermissionUpdateDemand();

                } else {
                    this.router.navigate(['nao-autorizado']);
                }
            });
    }

    getPermissionUpdateDemand() {

        if ((this.currentUser.user.role !== 11 && this.currentUser.user.role !== 10 && this.currentUser.user.role !== 9) && !this.demand.permission_syndicate && this.demand.entity_id === 2) {
            this.permissionUpdateDemand = false;
        }

        if ((this.currentUser.user.role !== 13 && this.currentUser.user.role !== 10) && !this.demand.permission_syndicate && this.demand.entity_id === 3) {
            this.permissionUpdateDemand = false;
        }

        if ((this.demand.histories[0].status === 1 || this.demand.histories[0].status === 7 || this.demand.histories[0].status === 6 || this.demand.histories[0].status === 9)) {
            this.permissionUpdateDemand = false;
        }
    }

    addHistoryDemand(event, demand) {
        event.stopPropagation();
    }

    destroyDemand() {
        if (confirm('Tem certeza que deseja excluir esta demanda?')) {
            this.destroyDemandServiceSubscribe = this.demandService.destroyDemand({demand_id: this.demand.id}).subscribe(res => {

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
        if (this.destroyDemandServiceSubscribe) {
            this.destroyDemandServiceSubscribe.unsubscribe();
        }
    }
}
