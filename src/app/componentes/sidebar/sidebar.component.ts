import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/UserInterface';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  $user!:Observable<UserInterface>;

  constructor(private auth: AuthServiceService) { }

  ngOnInit(): void {
    this.$user = this.auth.userObs;
  }


}
