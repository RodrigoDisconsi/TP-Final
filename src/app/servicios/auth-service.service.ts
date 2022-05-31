import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';
import { UserInterface } from '../models/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public userObs = new Subject<UserInterface>(); 

  
  constructor(private fauth:AngularFireAuth) { 
    
  }
  
  // get isLoggedIn() {
  //   return this.userObs.asObservable(); 
  // }

  logout(): Promise<void>{
    return this.fauth.signOut();
  }

  register(email:string, password:string): Promise<any>{
    return this.fauth.createUserWithEmailAndPassword(email,password);
  }

  login(email:string, password:string): Promise<any>{
    return this.fauth.signInWithEmailAndPassword(email,password);
  }

  refreshData(userParam:UserInterface){
    this.userObs.next(userParam);
  }
}
