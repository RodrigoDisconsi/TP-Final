import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { HorariosInterface } from 'src/app/models/horarios-interface';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { UserInterface } from 'src/app/models/UserInterface';
import { AuthService } from 'src/app/servicios/auth-service.service';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {

  $user!:Observable<UserInterface | null>;
  displayModal: boolean = false;


  constructor(private auth:AuthService, private afs:FirebaseService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.$user = this.auth.userObs;
  }

  showModalDialog() {
    this.displayModal = true;
  }

  enviarHorario(horario:HorariosInterface, user:UserInterface){
    if(!user.horarios){
      user.horarios = [horario];
    }
    user.horarios.push(horario);
    this.afs.setObj("users", user, user.email).then(resp => {
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Horario agregado!'});
    });
  }
}
