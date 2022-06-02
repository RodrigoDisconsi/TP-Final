import { Component, Input, OnInit, Output } from '@angular/core';
import { UserInterface } from 'src/app/models/UserInterface';
import { FirebaseServiceService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {
  @Input() listUser!:UserInterface[];

  constructor(private afs:FirebaseServiceService) { }

  ngOnInit(): void {
  }

  onClickHabilita(){

  }

  onClickDeshabilita(){
    
  }

}
