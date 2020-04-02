import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-ininite-scroll',
    templateUrl: './ininite-scroll.component.html',
    styleUrls: ['./ininite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit {

    @Output() scrolled: any = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onScroll() {
        this.scrolled.emit(true);
    }
}
