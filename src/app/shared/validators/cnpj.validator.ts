import {AbstractControl} from '@angular/forms';

export function ValidateUrl(control: AbstractControl) {

    let cnpj = control.value;

    if (!cnpj || (cnpj && cnpj.length < 14)) {
        return {'cnpjValidator': true};
    }

    cnpj = cnpj.replace(/[^\d]+/g, '');

    // Elimina CNPJs invalidos conhecidos
    if (cnpj === '00000000000000' ||
        cnpj === '11111111111111' ||
        cnpj === '22222222222222' ||
        cnpj === '33333333333333' ||
        cnpj === '44444444444444' ||
        cnpj === '55555555555555' ||
        cnpj === '66666666666666' ||
        cnpj === '77777777777777' ||
        cnpj === '88888888888888' ||
        cnpj === '99999999999999')
        return {'cnpjValidator': true};

    // Valida DVs
    let cnpjLength = cnpj.length - 2;
    let cnpjNumber = cnpj.substring(0, cnpjLength);
    const digits = cnpj.substring(cnpjLength);
    let cnpjsum = 0;
    let pos = cnpjLength - 7;

    for (let i = cnpjLength; i >= 1; i--) {
        cnpjsum += cnpjNumber.charAt(cnpjLength - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    let resultado = cnpjsum % 11 < 2 ? 0 : 11 - cnpjsum % 11;

    if (resultado != digits.charAt(0))
        return {'cnpjValidator': true};

    cnpjLength = cnpjLength + 1;
    cnpjNumber = cnpj.substring(0, cnpjLength);
    cnpjsum = 0;
    pos = cnpjLength - 7;
    for (let i = cnpjLength; i >= 1; i--) {
        cnpjsum += cnpjNumber.charAt(cnpjLength - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    resultado = cnpjsum % 11 < 2 ? 0 : 11 - cnpjsum % 11;

    if (resultado != digits.charAt(1))
        return {'cnpjValidator': true};

    return null;
}