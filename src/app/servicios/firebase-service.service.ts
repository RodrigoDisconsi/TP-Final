import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { UserInterface } from '../models/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage){
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

  getWithFilter(entidad:string, campo:string, value:any){
    return this.afs.collection(entidad, ref => ref.where(campo, '==', value)).valueChanges();
  }

  getTurnoByPaciente(value:string){
    return this.afs.collection("turnos", ref => ref.where("paciente.email", '==', value)).valueChanges();
  }

  getTurnoByEspecialista(value:string){
    return this.afs.collection("turnos", ref => ref.where("especialista.email", '==', value)).valueChanges();
  }

  getUsersWithFilter(campo:string, value:string){
    return this.afs.collection('users', ref => ref.where(campo, '==', value).where('habilitado', '==', true)).valueChanges();
  }

  updateUser(user:UserInterface, status:boolean){
    return this.afs.collection('users').doc(user.email).update({
      habilitado: status
    });
  }

  async uploadImage(email:string, img:any){
    try{
      let storageRef = this.storage.ref("/users/" + email);
      let resp = await storageRef.putString(img, "data_url");
      
      return await resp.ref.getDownloadURL();
    }
    catch(err){
      console.error(err);
      return null;
    }
  }
  
}
