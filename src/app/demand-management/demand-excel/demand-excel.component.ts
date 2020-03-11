import { Component, OnInit, Input } from '@angular/core';
import {ExcelService} from './demand-excel.service';
import { DemandService } from '../demand.service';

@Component({
  selector: 'app-demand-excel',
  templateUrl: './demand-excel.component.html',
  styleUrls: ['./demand-excel.component.scss']
})
export class DemandExcelComponent implements OnInit {
  
  @Input('demandsFilter') demandsFilter: any;


  data: any = [
    {eid: 'e101', ename: 'ravi', esal: 1000},
    {eid: 'e102', ename: 'ram', esal: 2000},
    {eid: 'e103', ename: 'rajesh', esal: 3000}
  ];
  
  constructor(private excelService: ExcelService, private demandService: DemandService) { }

    ngOnInit() {
    }

    ngOnChanges(event) {
      if (event && !event.demandsFilter.firstChange) {
        console.log(event);
        console.log(this.demandsFilter);
      }
    }
  
    getDemandsExcel() {

    }

    exportAsXLSX():void {
      if (this.demandsFilter) {
        this.demandService.getDemandsExcel(this.demandsFilter).subscribe(res => {
          console.log(res);
        });
      }
      //  this.excelService.exportAsExcelFile(this.data, 'demands');
    }


}
