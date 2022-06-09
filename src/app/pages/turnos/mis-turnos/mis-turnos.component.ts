import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/UserInterface';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  $currentUser!:Observable<UserInterface | null>

  constructor(
    private auth:AuthServiceService
  ) { }

  ngOnInit(): void {
    this.$currentUser = this.auth.userObs;
  }


}
