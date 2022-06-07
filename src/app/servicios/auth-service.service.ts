import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserInterface } from '../models/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public userObs = new BehaviorSubject<UserInterface | null>(null); 

  
  constructor(private fauth:AngularFireAuth) { 
    
  }

  logout(): Promise<void>{
    return this.fauth.signOut();
  }

  register(email:string, password:string): Promise<any>{
    return this.fauth.createUserWithEmailAndPassword(email,password);
  }

  login(email:string, password:string): Promise<any>{
    return this.fauth.signInWithEmailAndPassword(email,password);
  }

  refreshData(userParam:UserInterface | null){
    this.userObs.next(userParam);
  }
}
