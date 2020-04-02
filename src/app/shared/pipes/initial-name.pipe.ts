import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'initialName'
})
export class InitialName implements PipeTransform {
    transform(value) {
        if (value) {
            let initials = value.match(/\b\w/g) || [];
            initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

            return initials;
        }
    }
}
