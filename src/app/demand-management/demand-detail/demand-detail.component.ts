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
    editPermission: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private demandService: DemandService,
        private sharedService: SharedsService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.demandId = parseInt(this.route.snapshot.paramMap.get('demandaId'));
        this.sharedService.setTitle(`Demanda #${this.demandId}`);

        if (this.demandId) {
            this.getDemand(this.demandId);
        }

        this.currentUser = JSON.parse(localStorage.getItem('user'));
    }

    getDemand(id: number) {
        this.demandService.getDemand(id)
            .subscribe(res => {
                if (res && res.permission) {

                    this.demand = res.data[0];

                    this.demand.histories.forEach(element => {

                        if (element.cost) {
                            this.total = this.total + parseFloat(element.cost);
                        }

                        if (element.time_period) {
                            this.timePeriod = element.time_period;
                        }

                        if (element.status === 8 && this.currentUser) {
                            this.editPermission = ((element.user.id === this.currentUser.user.id) || (this.currentUser.user.role === 10));
                        }
                    });
                } else {
                    this.router.navigate(['nao-autorizado']);
                }
            });
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
