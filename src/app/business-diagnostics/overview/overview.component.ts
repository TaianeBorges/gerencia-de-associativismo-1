import {Component, OnInit} from '@angular/core';
import {SharedsService} from '../../shared/shareds.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CNPJPipe} from '../../shared/pipes/cnpj.pipe';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

    formCompany: FormGroup;
    cnpj;

    constructor(private fb: FormBuilder,
                private cnpjPipe: CNPJPipe,
                private sharedService: SharedsService) {
    }

    ngOnInit() {
        this.sharedService.setTitle('Diagnóstico Empresarial');
        this.formCompany = this.fb.group({
            cnpj: new FormControl()
        });
    }

    maskCnpj(val) {
        if (val.value) {
            val = this.cnpjPipe.transform(val.value);
            this.formCompany.get('cnpj').setValue(val);
            this.formCompany.get('cnpj').updateValueAndValidity();
        }
    }
}
