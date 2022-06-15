import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/UserInterface';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-master-usuarios',
  templateUrl: './master-usuarios.component.html',
  styleUrls: ['./master-usuarios.component.scss']
})
export class MasterUsuariosComponent implements OnInit {

  public users!:UserInterface[];
  public nuevoUsuario:boolean = false;
  constructor(private afs:FirebaseService) { }

  ngOnInit(): void {
    this.afs.getAll('users').subscribe(resp => {
      this.users = resp as UserInterface[];
      console.info(this.users);
    })
  }

  onClick(){
    this.nuevoUsuario = true;
  }

}
