import { Component, Input, OnInit } from '@angular/core';
import { TurnoInterface } from 'src/app/models/turno-interface';

@Component({
  selector: 'app-ultimos-turnos',
  templateUrl: './ultimos-turnos.component.html',
  styleUrls: ['./ultimos-turnos.component.scss']
})
export class UltimosTurnosComponent implements OnInit {

  @Input() ultimosTurnos!:TurnoInterface[];
  displayDialogHistClin:boolean = false;
  turnoHist!:TurnoInterface;
  // @Output() turnoExport = new EventEmitter<TurnoInterface[]>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectHistClin(turno:TurnoInterface){
    this.turnoHist = turno;
    this.displayDialogHistClin = true;
  }


  // exportTurnosPaciente(user:UserInterface){
  //   if(user.rol == 'paciente'){
  //     this.afs.getTurnoRealizado("paciente.email", user.email).subscribe(resp => {
  //       let turno = resp as TurnoInterface[];
  //       this.turnoExport.emit(turno);
  //     });
  //   }
  // }

}
