import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInterface } from 'src/app/models/UserInterface';

@Component({
  selector: 'app-tabla-users-turno',
  templateUrl: './tabla-users-turno.component.html',
  styleUrls: ['./tabla-users-turno.component.scss']
})
export class TablaUsersTurnoComponent implements OnInit {

  @Input() listEspecialistas!:UserInterface[];
  @Output() especialista = new EventEmitter<UserInterface | null>();

  constructor() { }

  ngOnInit(): void {
  }

  //Directamente va al siguiente paso
  onClick(esp:UserInterface){
    let aux = this.listEspecialistas.filter(x => x.seleccionado == true);
    if(aux.length == 0){
      esp.seleccionado = true;
      this.especialista.emit(esp);
    }
    else if(aux.length == 1 && esp.seleccionado){
      esp.seleccionado = false;
      this.especialista.emit(null);
    }
  }

}
