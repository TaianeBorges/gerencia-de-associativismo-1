import {Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy} from '@angular/core';

@Pipe({
    name: 'dateAgo',
    pure: false

})
export class DateAgoPipe implements PipeTransform {
    private timer: number;

    constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {
    }

    transform(value: any): any {
        if (value) {
            return value;
        }
    }
}
