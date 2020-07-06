import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';

declare const $: any;

@Component({
    selector: 'app-card-status',
    templateUrl: './card-status.component.html',
    styleUrls: ['./card-status.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CardStatusComponent implements OnInit, OnChanges {

    single = [
        {
            name: 'Registrada',
            value: 10
        }
    ];
    items = [];
    @Input('demands') demands;
    total;
    view: any[] = [135, 150];
    designatedTotal = 15;
    colorScheme = {
        domain: ['#666', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.demands) {
            this.items = this.demands.data;
            this.total = this.demands.total;

            console.log($('.percent-label'));
        }
    }

    getPercent(value) {

        value = (value * 100) / this.total;

        return Math.ceil(Math.round(value) / 10);
    }
}
