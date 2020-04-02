import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
    selector: 'app-menu-loader',
    templateUrl: './menu-loader.component.html',
    styleUrls: ['./menu-loader.component.scss']
})
export class MenuLoaderComponent implements OnInit {

    @Input('visibility') visibility: boolean;
    @Input('color') color: string;

    constructor() {
    }

    ngOnInit() {
    }
}
