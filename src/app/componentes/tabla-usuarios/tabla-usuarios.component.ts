import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/UserInterface';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {
  @Input() listUser!:UserInterface[];

  constructor() { }

  ngOnInit(): void {
  }

}
