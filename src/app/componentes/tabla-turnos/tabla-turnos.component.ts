import { Component, Input, OnInit } from '@angular/core';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { UserInterface } from 'src/app/models/UserInterface';
import { FirebaseServiceService } from 'src/app/servicios/firebase-service.service';

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
    private afs:FirebaseServiceService
  ) { }

  ngOnInit(): void {
    if(this.user.rol == "administrador" ){
      //todo 
    }
    else{
      if(this.user.rol == "paciente"){
        this.campo = "paciente";  
      }
      else{
        this.campo = "especialista";
      }
      this.afs.getAll("turnos").subscribe(resp => {
        let aux = resp as TurnoInterface[];
        if(this.user.rol == "paciente"){
          this.turnos = aux.filter(turno => turno.paciente.email == this.user.email);
        }
        else if(this.user.rol == "especialista"){
          this.turnos = aux.filter(turno => turno.especialista.email == this.user.email);
        }
        else{
          this.turnos = aux;
        }
        this.turnosWithoutFilter = this.turnos;
      });
    }
  }

  onFilter(){
    this.turnos = this.turnosWithoutFilter.filter(turno => turno.especialidad.toLowerCase().includes(this.filter.toLowerCase()) || 
                                       turno.especialista.nombre.toLowerCase().includes(this.filter.toLowerCase()) ||
                                       turno.especialista.apellido.toLowerCase().includes(this.filter.toLowerCase()))
  }

}
