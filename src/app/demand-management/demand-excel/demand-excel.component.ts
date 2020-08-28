import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {ExcelService} from './demand-excel.service';
import {DemandService} from '../demand.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-demand-excel',
    templateUrl: './demand-excel.component.html',
    styleUrls: ['./demand-excel.component.scss']
})
export class DemandExcelComponent implements OnInit, OnDestroy {

    @Input('demandsFilter') demandsFilter: any;
    @Input('mobile') mobile: boolean;
    demandExcelSubscription: Subscription;

    constructor(private excelService: ExcelService, private demandService: DemandService) {
    }

    ngOnInit() {
    }

    getDemandsExcel() {
    }

    exportAsXLSX(): void {
        if (this.demandsFilter) {
            this.demandExcelSubscription = this.demandService.getDemandsExcel(this.demandsFilter).subscribe(res => {
                if (res && res.data && res.data.length) {
                    this.excelService.exportAsExcelFile(res.data, 'demandas');
                }
            });
        }
    }

    ngOnDestroy() {
        if (this.demandExcelSubscription) {
            this.demandExcelSubscription.unsubscribe();
        }
    }
}
