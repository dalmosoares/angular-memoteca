import { AbstractControl } from "@angular/forms";

export function minusculoValidator(control: AbstractControl) {
    const autoria = control.value as string;
    console.log(autoria);
    if(autoria !== autoria?.toUpperCase()) {
        return { minusculo: true };
    } else
    return null;
}