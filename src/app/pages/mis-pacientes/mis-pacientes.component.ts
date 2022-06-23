import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { UserInterface } from 'src/app/models/UserInterface';
import { AuthService } from 'src/app/servicios/auth-service.service';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.scss']
})
export class MisPacientesComponent implements OnInit {
  
  $currentUser!:Observable<UserInterface | null>;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.$currentUser = this.auth.userObs;
  }

}
