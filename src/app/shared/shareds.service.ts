import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedsService {

  public stateMenu: any = new EventEmitter();

  constructor() { }

  actionMenu(value) {
    this.stateMenu.emit({ open: value });
  }
}
