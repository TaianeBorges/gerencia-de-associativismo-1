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

        let title = value;

        if (value.indexOf('<p matTooltip') !== -1) {
            title = value.substr(0, value.indexOf('<p matTooltip'));
        }

        this.titleService.setTitle(title);
        this.titlePage.emit(value);
    }
}
