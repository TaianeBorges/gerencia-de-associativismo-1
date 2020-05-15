import {Component, OnInit, ElementRef, Renderer2, OnDestroy} from '@angular/core';
import {SharedsService} from 'src/app/shared/shareds.service';
import {DemandService} from '../demand.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-demand-list',
    templateUrl: './demand-list.component.html',
    styleUrls: ['./demand-list.component.scss']
})
export class DemandListComponent implements OnInit, OnDestroy {
    demandOpened = true;
    demands: any;
    page = 1;
    demandSelected: any;
    demandAddSelected: any;
    openModalAddHistory: any;
    openModalShowHistory: any;
    demandServiceSubscribe: Subscription;
    params: object;
    filtersParams = {
        entity_id: '',
        demand_requester: '',
        syndicate_id: '',
        status_id: '',
        demand_id: '',
        demand_category_id: '',
        sector_id: '',
        page: 1
    };
    currentUser;

    constructor(
        private sharedService: SharedsService,
        private demandService: DemandService,
        private elRef: ElementRef,
        private router: Router,
        private renderer: Renderer2) {
    }

    ngOnInit() {
        this.sharedService.setTitle('Lista de demandas');

        this.listDemands();

        this.currentUser = JSON.parse(localStorage.getItem('user'));
    }

    openDemand(demand) {
        // const element = this.elRef.nativeElement.querySelector(`.demand-${demand}`);
        // const activated = this.elRef.nativeElement.querySelector('.demand-active');
        //
        // if (activated) {
        //     this.renderer.removeClass(activated, 'demand-active');
        // }
        //
        // this.renderer.addClass(element, 'demand-active');
    }

    replaceText(text) {
        const result = text.replace(/<br\s*\/?>/gi, ' ');
        return result;
    }

    onPagination(event) {
        if (event) {
            this.filtersParams.page = event.page;
        }

        this.listDemands();
    }

    goDemand(id) {

        if (id) {
            this.router.navigate(['/gestao-de-demandas/demanda/', id]);
        }
    }

    usersDemand(items) {
        const result = [];

        items.forEach((item, itemIndex) => {
            let permission = true;

            result.forEach((value, i) => {
                if (value.id === item.user.id) {
                    permission = false;
                }
            });

            if (permission) {
                result.push(item.user);
            }
        });

        return result;
    }

    historyDemand(event) {
        event.stopPropagation();
    }

    addHistoryDemand(event) {
        event.stopPropagation();
    }

    listDemands() {
        this.demandServiceSubscribe = this.demandService.getDemands(this.filtersParams)
            .subscribe(res => {
                this.demands = res;
            });
    }

    permissionUpdateDemand(demand): boolean {

        let permission = true;

        if ((this.currentUser.user.role !== 11 && this.currentUser.user.role !== 10) && !demand.permission_syndicate && demand.entity_id === 2) {
            permission = false;
        }

        if ((this.currentUser.user.role !== 13 && this.currentUser.user.role !== 10) && !demand.permission_syndicate && demand.entity_id === 3) {
            permission = false;
        }

        if ((demand.histories[0].status === 1 || demand.histories[0].status === 7 || demand.histories[0].status === 6 || demand.histories[0].status === 9)) {
            permission = false;
        }

        return permission;
    }

    closeModal(event) {
        // console.log(event);
    }

    filterSubmit(event) {
        for (const key in event.filters) {
            this.filtersParams[key] = event.filters[key];
        }

        this.listDemands();
    }

    ngOnDestroy() {
        this.demandServiceSubscribe.unsubscribe();
    }
}
