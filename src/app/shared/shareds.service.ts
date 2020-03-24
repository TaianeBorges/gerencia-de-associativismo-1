import {Injectable, EventEmitter} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class SharedsService {

    public stateMenu: any = new EventEmitter();
    public titlePage: any = new EventEmitter();

    constructor(private titleService: Title) {
    }

    actionMenu(value) {
        this.stateMenu.emit({open: value});
    }

    setTitle(value) {
        this.titleService.setTitle(value);
        this.titlePage.emit(value);
    }
}
