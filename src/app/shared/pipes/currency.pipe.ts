import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
    transform(value: any) {
        if (typeof value === 'number') {
            value = value.toFixed(2);
        }

        var valor = value;
            
            valor = valor + '';
            valor = parseInt(valor.replace(/[\D]+/g,''));
            valor = valor + '';
            valor = valor.replace(/([0-9]{2})$/g, ",$1");
          
            if (valor.length > 6) {
              valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
          
        return valor;
    }
}
 