import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-initial-name',
    templateUrl: './initial-name.component.html',
    styleUrls: ['./initial-name.component.scss']
})
export class InitialNameComponent implements OnInit {

    @Input('user') user;
    @Input('forwarded') forwarded: boolean;
    userHover: boolean;

    constructor() {
    }

    ngOnInit() {

    }

}
