import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/UserInterface';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  $user!:Observable<UserInterface | null>;
  displayModal: boolean = false;

  constructor(private auth:AuthServiceService) { }

  ngOnInit(): void {
    this.$user = this.auth.userObs;
  }

  showModalDialog() {
    this.displayModal = true;
  }
}
