import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {
  constructor(private afs: AngularFirestore){
  }

  getAll(entidad:string){
    return this.afs.collection(entidad).valueChanges();
  }


  setObj(entidad:string, obj:any){
    return this.afs.collection(entidad).doc(obj.email).set(obj, {merge: true});
  }

  removeObj(entidad:string, obj:any){
    return this.afs.collection(entidad).doc(obj.id).delete();
  }

  getWithFilter(entidad:string, campo:string, value:string){
    return this.afs.collection(entidad, ref => ref.where(campo, '==', value)).valueChanges();
  }
  
}
