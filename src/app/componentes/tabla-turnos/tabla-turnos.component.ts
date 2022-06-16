import { Component, Input, OnInit } from '@angular/core';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { UserInterface } from 'src/app/models/UserInterface';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.scss']
})
export class TablaTurnosComponent implements OnInit {

  @Input() user!:UserInterface;
  turnos!:TurnoInterface[];
  campo!:string;
  filter!:string;
  activeSearch:boolean = false;
  turnosWithoutFilter!:TurnoInterface[];

  constructor(
    private afs:FirebaseService
  ) { }

  ngOnInit(): void {
    if(this.user.rol == "administrador" ){
      //todo 
    }
    else{
      if(this.user.rol == "paciente"){
        this.afs.getTurnoByPaciente(this.user.email).subscribe(resp =>{
          this.turnos = resp as TurnoInterface[];
          this.turnosWithoutFilter = this.turnos;
        });
      }
      else{
        this.afs.getTurnoByEspecialista(this.user.email).subscribe(resp =>{
          this.turnos = resp as TurnoInterface[];
          this.turnosWithoutFilter = this.turnos;
        });
      }
    }
  }

  onFilter(){
    this.turnos = this.turnosWithoutFilter.filter(turno => turno.especialidad.toLowerCase().includes(this.filter.toLowerCase()) || 
                                       turno.especialista.nombre.toLowerCase().includes(this.filter.toLowerCase()) ||
                                       turno.especialista.apellido.toLowerCase().includes(this.filter.toLowerCase()))
  }

}
