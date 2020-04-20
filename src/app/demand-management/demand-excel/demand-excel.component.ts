import {Component, OnInit, Input} from '@angular/core';
import {ExcelService} from './demand-excel.service';
import {DemandService} from '../demand.service';

@Component({
    selector: 'app-demand-excel',
    templateUrl: './demand-excel.component.html',
    styleUrls: ['./demand-excel.component.scss']
})
export class DemandExcelComponent implements OnInit {

    @Input('demandsFilter') demandsFilter: any;

    constructor(private excelService: ExcelService, private demandService: DemandService) {
    }

    ngOnInit() {
    }

    getDemandsExcel() {
    }

    exportAsXLSX(): void {
        if (this.demandsFilter) {
            this.demandService.getDemandsExcel(this.demandsFilter).subscribe(res => {
                if (res && res.data && res.data.length) {
                    this.excelService.exportAsExcelFile(res.data, 'demandas');
                }
            });
        }
    }


}
