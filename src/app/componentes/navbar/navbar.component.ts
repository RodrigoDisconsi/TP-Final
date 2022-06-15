import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/UserInterface';
import { AuthService } from 'src/app/servicios/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  $user!:Observable<UserInterface | null>;

  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.$user = this.auth.userObs;
  }

  onLogout(){
    this.auth.logout().then(() => {
      this.auth.refreshData(null);
      this.router.navigateByUrl("");
    })
  }
}
