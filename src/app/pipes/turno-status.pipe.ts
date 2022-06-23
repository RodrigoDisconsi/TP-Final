import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turnoStatus'
})
export class TurnoStatusPipe implements PipeTransform {

  transform(estado: string): string {
    let retorno = "";
    if(estado == "realizado"){
      retorno = "COMPLETADO";
    }
    else{
      retorno = estado.toUpperCase();
    }
    return retorno;
  }

}
