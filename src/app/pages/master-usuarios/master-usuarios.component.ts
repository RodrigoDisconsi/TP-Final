import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/UserInterface';
import { FirebaseServiceService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-master-usuarios',
  templateUrl: './master-usuarios.component.html',
  styleUrls: ['./master-usuarios.component.scss']
})
export class MasterUsuariosComponent implements OnInit {

  public users!:UserInterface[];
  constructor(private afs:FirebaseServiceService) { }

  ngOnInit(): void {
    this.afs.getAll('users').subscribe(resp => {
      this.users = resp as UserInterface[];
      console.info(this.users);
    })
  }

}