import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-users-turno',
  templateUrl: './tabla-users-turno.component.html',
  styleUrls: ['./tabla-users-turno.component.scss']
})
export class TablaUsersTurnoComponent implements OnInit {

  prueba:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  test(){
    this.prueba = !this.prueba;
  }

}
