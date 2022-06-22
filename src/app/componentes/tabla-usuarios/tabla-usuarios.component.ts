import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { UserInterface } from 'src/app/models/UserInterface';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {
  @Input() listUser!:UserInterface[];
  @Output() turnoExport = new EventEmitter<TurnoInterface[]>();

  constructor(private afs:FirebaseService) { }

  ngOnInit(): void {
  }

  onClick(estado:boolean){
    let listToUpdate = this.listUser.filter(x => x.seleccionado == true);
    if(listToUpdate){
      listToUpdate.forEach(element => {
        this.afs.updateUser(element, estado).then(x => {
        });
      });
    }
  }

  exportTurnosPaciente(user:UserInterface){
    if(user.rol == 'paciente'){
      this.afs.getTurnoRealizado("paciente.email", user.email).subscribe(resp => {
        let turno = resp as TurnoInterface[];
        this.turnoExport.emit(turno);
      });
    }
  }

}
