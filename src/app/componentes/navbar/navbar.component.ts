import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/UserInterface';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  $user!:Observable<UserInterface>;

  constructor(private auth: AuthServiceService) { }

  ngOnInit(): void {
    this.$user = this.auth.userObs;
  }

}
