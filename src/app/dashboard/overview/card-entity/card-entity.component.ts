import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
    selector: 'app-card-entity',
    templateUrl: './card-entity.component.html',
    styleUrls: ['./card-entity.component.scss']
})
export class CardEntityComponent implements OnInit, OnChanges {
    items;
    total;
    @Input('demands') demands;

    view: any[] = [700, 200];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    showYAxisLabel = true;

    colorScheme = {
        domain: ['#E74C3C', '#E67E22', '#F1C40F', '#3498DB', '#2ECC71']
    };

    constructor() {
    }

    ngOnInit() {
    }


    ngOnChanges() {
        if (this.demands) {
            this.items = this.demands.data;
            this.total = this.demands.total;
        }
    }

    onSelect($event) {
    }

    overviewEntity() {
    };
}
