import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterface } from '../models/UserInterface';
import { AuthService } from '../servicios/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminActiveGuard implements CanActivate { 

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.userObs.subscribe(data => {
        if(data == null){
          this.router.navigateByUrl('Login');
        }
        else if(data.rol != "administrador"){
          this.router.navigateByUrl('');
        }
      })
      return true;
  }
  
}
