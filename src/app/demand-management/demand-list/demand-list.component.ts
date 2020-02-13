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
    demandServiceSubscribe: Subscription;
    params: object;
    openModalAddHistory = false;

    constructor(
        private sharedService: SharedsService,
        private demandService: DemandService,
        private elRef: ElementRef,
        private renderer: Renderer2,
        private route: Router,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.sharedService.setTitle('Lista de demandas');

        this.getFilters();
        this.listDemands();
    }

    getFilters() {

        // const item = 'entidade_id=1&cadastrante_nome=&sindicato_id=&status_id=&demanda_id=&demanda_categoria_id=&page=1'.split('&');
    }

    openDemand(demand) {
        const element = this.elRef.nativeElement.querySelector(`.demand-${demand} .extended-items`);
        if (element.getAttribute('class').indexOf('display-none') !== -1) {
            this.renderer.removeClass(element, 'display-none');
        } else {
            this.renderer.addClass(element, 'display-none');
        }
    }

    onPagination(event) {
        this.page = event.page;
        this.listDemands();
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

    historyDemand(event, demand) {
        event.stopPropagation();
    }

    addHistoryDemand(event) {
        event.stopPropagation();
    }

    listDemands(filters = null) {
        if (!filters) {
            filters = {
                page: this.page
            };
        } else {
            filters.page = this.page;
        }

        // this.route.navigate(['gestao-de-demandas/lista-de-demandas'], { queryParams: filters });

        this.demandServiceSubscribe = this.demandService.getDemands(filters)
            .subscribe(res => {
                this.demands = res;
            });
    }

    closeModal(event) {
        console.log(event);
    }

    filterSubmit(event) {
        this.page = 1;
        this.listDemands(event.filters);
    }

    ngOnDestroy() {
        this.demandServiceSubscribe.unsubscribe();
    }
}
