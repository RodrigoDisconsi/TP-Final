import { Component, OnInit } from '@angular/core';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { AuthService } from 'src/app/servicios/auth-service.service';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {

  turnos!:TurnoInterface[];
  constructor(private afs:FirebaseService) { }

  ngOnInit(): void {
    this.afs.getAll("turnos").subscribe(resp =>{
      this.turnos = resp as TurnoInterface[];
      // let cantidadDeTurnosPorDía:any = this.turnos.reduce((group:any, turno) => {
      //   let fechaKey = turno.fecha.split(" - ")[0];
      //   group[fechaKey] = group ?? [];
      //   group[fechaKey].push(turno);
      //   return group;
      // }, {});
      // console.info(cantidadDeTurnosPorDía);
      let cantidadDeTurnosPorDía:{fecha:string, cantidad:number}[] = [];
      this.turnos.forEach(turno => {
        let fecha = turno.fecha.split(" - ")[0];
        let index = cantidadDeTurnosPorDía.findIndex(x => x.fecha == fecha);
        if(index >= 0){
          cantidadDeTurnosPorDía[index].cantidad ++;
        }
        else{
          cantidadDeTurnosPorDía.push({
            fecha: fecha,
            cantidad: 1
          });
        }
      });
      console.info(cantidadDeTurnosPorDía);
    });
  }

}
