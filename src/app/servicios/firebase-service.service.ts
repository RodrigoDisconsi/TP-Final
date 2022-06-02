import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserInterface } from '../models/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  constructor(private afs: AngularFirestore){
  }

  getAll(entidad:string){
    return this.afs.collection(entidad).valueChanges();
  }


  setObj(entidad:string, obj:any, id:string){
    return this.afs.collection(entidad).doc(id).set(obj, {merge: true});
  }

  removeObj(entidad:string, obj:any){
    return this.afs.collection(entidad).doc(obj.id).delete();
  }

  getWithFilter(entidad:string, campo:string, value:string){
    return this.afs.collection(entidad, ref => ref.where(campo, '==', value)).valueChanges();
  }

  getUsers(email:string){
    return this.afs.collection('users', ref => ref.where('email', '==', email) && ref.where('habilitado', '==', true)).valueChanges();
  }
  
}
