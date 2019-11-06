import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
    transform(value) {
        return this.capitalizeText(value);
    }

    capitalizeText(value) {
        if (value) {
            value = value.charAt(0).toUpperCase() + value.slice(1);
        }

        return value;
    }
}
