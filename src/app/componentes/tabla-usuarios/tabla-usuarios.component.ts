import { Component, Input, OnInit, Output } from '@angular/core';
import { UserInterface } from 'src/app/models/UserInterface';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.scss']
})
export class TablaUsuariosComponent implements OnInit {
  @Input() listUser!:UserInterface[];

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

}
