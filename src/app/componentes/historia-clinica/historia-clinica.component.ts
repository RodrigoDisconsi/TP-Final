import { Component, Input, OnInit } from '@angular/core';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { UserInterface } from 'src/app/models/UserInterface';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {
  
  @Input() paciente!:UserInterface;
  historiaClinica!:TurnoInterface[];

  constructor(private afs:FirebaseService) { }

  ngOnInit(): void {
    this.afs.getTurnoRealizado("paciente.email", this.paciente.email).subscribe(resp => {
      if(resp){
        this.historiaClinica = resp as TurnoInterface[];
      }
    });
  }

}
