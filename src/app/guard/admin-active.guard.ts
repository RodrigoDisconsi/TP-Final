import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterface } from '../models/UserInterface';
import { AuthServiceService } from '../servicios/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminActiveGuard implements CanActivate {

  user$: Observable<UserInterface>; 

  constructor(private authService: AuthServiceService, private router: Router) {
    this.user$ = this.authService.userObs;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.user$.subscribe(data => {
        if(data == null || data == undefined){
          this.router.navigateByUrl('Login');
        }
        else if(data.rol != "administrador"){
          this.router.navigateByUrl('');
        }
      })
      return true;
  }
  
}
