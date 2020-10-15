import {Component, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation, EventEmitter} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Subscription} from 'rxjs';
import {DemandService} from '../demand.service';
import {AlertService} from '../../shared/alerts/alert.service';
import * as _ from 'lodash';


@Component({
    selector: 'app-demand-history',
    templateUrl: './demand-history.component.html',
    styleUrls: ['./demand-history.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemandHistoryComponent implements OnInit, OnChanges, OnDestroy {

    _: any = _;
    modalRef: BsModalRef;
    currentUser;
    destroyStatusSubscribe: Subscription;
    optionsStatus = [];

    @ViewChild('modal', {static: false}) modal;
    @Input('demandSelected') demandSelected: any;
    @Input('openModal') openModal: boolean;
    @Output('deleteHistory') deleteHistory = new EventEmitter();
    @Output('updateHistory') updateHistory = new EventEmitter();
    @Output('closeHistory') closeHistory = new EventEmitter();

    constructor(
        private modalService: BsModalService,
        private demandService: DemandService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('user'));
        this.getStatus();
    }

    ngOnChanges(changes: any) {
        if (changes && changes.openModal) {
            this.open();
        }
    }

    open() {
        if (this.demandSelected) {
            this.modalRef = this.modalService.show(this.modal, {class: 'modal-lg modal-dialog-centered modal-demand'});
        }
    }

    getStatus() {
        const data = {register: true};
        this.demandService.getStatus(data).subscribe((res) => this.optionsStatus = res.data);
    }

    updateStatus(event) {
        if (event) {
            this.demandSelected.histories.map((item, index) => {
                if (event.id === item.id) {
                    this.demandSelected.histories[index] = event;
                }
            });

            this.updateHistory.emit(this.demandSelected);
            // this.closeHistory.emit(true);
        }
    }

    delete_status(index, id) {
        if (confirm('Tem certeza que deseja apagar este estatus?')) {

            this.destroyStatusSubscribe = this.demandService.destroyStatus({status_id: id}).subscribe(res => {

                if (res.destroy) {

                    this.demandSelected.histories.splice(index, 1);

                    const alert = {
                        status: 200,
                        icon: 'check_circle',
                        color: 'success',
                        title: 'Parabéns!',
                        message: 'Status excluido com sucesso!'
                    };

                    this.alertService.alertShow(alert);

                    if (this.demandSelected.entity_id === 2 || this.demandSelected.entity_id === 3) {
                        this.demandSelected.justification = res.data.justification;
                        this.demandSelected.permission_syndicate = res.data.permission_syndicate;
                    }

                    this.deleteHistory.emit(this.demandSelected);
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.destroyStatusSubscribe) {
            this.destroyStatusSubscribe.unsubscribe();
        }
    }
}
