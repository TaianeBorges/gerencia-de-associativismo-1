import {Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Pipe({
    name: 'dateAgo',
    pure: false

})
export class DateAgoPipe implements PipeTransform {
    private timer: number;

    constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {
        moment.locale('pt-br');
    }

    transform(value: any): any {
        if (value) {
            return moment(value).fromNow();

        }
    }
}
