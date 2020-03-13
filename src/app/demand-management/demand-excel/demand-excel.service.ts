import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {
    constructor() { }

    public exportAsExcelFile(json: any[], excelFileName: string): void {

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        this.saveAsExcelFile(excelBuffer, excelFileName);
}

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const hour = today.getHours() > 12 ? today.getHours() - 12 : (today.getHours() < 10 ? "0" + today.getHours() : today.getHours());
        const minute = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
        const seconds = today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
        const date = `_${dd}_${mm}_${yyyy}_${hour}${minute}${seconds}`;

        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
        FileSaver.saveAs(data, fileName + date + EXCEL_EXTENSION);
    }
}