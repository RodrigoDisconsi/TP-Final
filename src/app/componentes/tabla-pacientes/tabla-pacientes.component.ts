import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { UserInterface } from 'src/app/models/UserInterface';
import { AuthService } from 'src/app/servicios/auth-service.service';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.scss']
})
export class TablaPacientesComponent implements OnInit {

  @Input() user!:UserInterface;
  displayDialogHistClin:boolean = false;
  filter!:string;
  activeSearch:boolean = false;
  turnos!:TurnoInterface[];
  loading:boolean = false;
  pacienteSelec!:UserInterface;

  constructor(private afs:FirebaseService) { }

  ngOnInit(): void {
    this.afs.getTurnoRealizado("especialista.email", this.user.email).subscribe(resp =>{
      this.turnos = resp as TurnoInterface[];
    });
  }

  onFilter(){
    // this.turnosFilter = this.turnos.filter(turno => turno.especialidad.toLowerCase().includes(this.filter.toLowerCase()) || 
    //                                    turno.especialista.nombre.toLowerCase().includes(this.filter.toLowerCase()) ||
    //                                    turno.especialista.apellido.toLowerCase().includes(this.filter.toLowerCase()))
  }

  onClickHist(paciente:UserInterface){
    this.pacienteSelec = paciente;
    this.displayDialogHistClin = true;
  }

}
