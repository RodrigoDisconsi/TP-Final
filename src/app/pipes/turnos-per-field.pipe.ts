import { Pipe, PipeTransform } from '@angular/core';
import { TurnoInterface } from '../models/turno-interface';

@Pipe({
  name: 'turnosPerField'
})
export class TurnosPerFieldPipe implements PipeTransform {

  transform(turnos: TurnoInterface[], ...args: any[]): {datasets: {data:number[], backgroundColor:string[], label:string}[], labels:string[]} {
    let data: {datasets: {data:number[], backgroundColor:string[], label:string}[], labels:string[]} = {
      datasets: [{
          data: [],
          backgroundColor: [
              "#42A5F5",
              "#66BB6A",
              "#FFA726",
              "#26C6DA",
              "#7E57C2"
          ],
          label: 'Cantidad de turnos por fecha'
      }],
      labels: []
    };
    let cantidadDeTurnosPorCampo:{clave:string, valor:number}[] = [];
    turnos.forEach(turno => {
      let fecha = turno.fecha.split(" - ")[0];
      let index = cantidadDeTurnosPorCampo.findIndex(x => {
        if(args[0] == 'fecha'){
          return x.clave == fecha;
        }
        else
          return x.clave = turno.especialidad
      });
      if(index >= 0){
        cantidadDeTurnosPorCampo[index].valor ++;
      }
      else{
        cantidadDeTurnosPorCampo.push({
          clave: args[0] == 'fecha' ? fecha : turno.especialidad,
          valor: 1
        });
      }
    });
    cantidadDeTurnosPorCampo.forEach(x=> {
      data.datasets[0].data.push(x.valor);   
      data.labels.push(x.clave);          
    });
    return data;
  }

}
