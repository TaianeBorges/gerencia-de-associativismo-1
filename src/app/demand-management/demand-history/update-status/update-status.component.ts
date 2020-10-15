import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DemandService} from '../../demand.service';
import {AlertService} from '../../../shared/alerts/alert.service';

@Component({
    selector: 'app-update-status',
    templateUrl: './update-status.component.html',
    styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent implements OnInit, OnChanges {

    @Input('options') options: any;
    @Input('currentStatus') currentStatus: any;
    @Output('updatedStatus') updatedStatus = new EventEmitter();

    formStatus: FormGroup;
    currentUser;

    constructor(
        private fb: FormBuilder,
        private demandService: DemandService,
        private alertService: AlertService
    ) {
        this.formStatus = this.fb.group({
            demand_history: new FormControl(''),
            status: new FormControl('')
        });
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('user'));
    }

    ngOnChanges(changes: any) {
        if (changes && this.options.length) {
            this.formStatus.get('demand_history').setValue(this.currentStatus.id);
            this.formStatus.get('status').setValue(this.currentStatus.status);
        }
    }

    onSubmit() {
        if (this.formStatus.valid) {
            this.demandService.updateStatus(this.formStatus.value).subscribe(res => {
                if (res.update) {

                    const alert = {
                        status: 200,
                        icon: 'check_circle',
                        color: 'success',
                        title: 'Parabéns!',
                        message: res.message
                    };

                    this.alertService.alertShow(alert);
                    this.updatedStatus.emit(res.data);
                }
            });
        }
    }

}
