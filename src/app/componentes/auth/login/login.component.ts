import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserInterface } from 'src/app/models/UserInterface';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';
import { FirebaseServiceService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  errorMsj = new Subject<string>();
  error: boolean = false;
  cargando: boolean = false;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  users!:UserInterface[];

  constructor(
    private router: Router,
    private auth: AuthServiceService,
    private afs:FirebaseServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.afs.getAll('users').subscribe(resp =>{
      let aux = resp as UserInterface[]
      let text = aux.filter(user => user.rol == "especialista").slice(0, 2);
      this.users = aux.filter(user => user.rol == "paciente").slice(0, 3);
      this.users = this.users.concat(aux.filter(user => user.rol == "especialista").slice(0, 2))
      this.users.push(aux.filter(user => user.rol == "administrador")[0]);
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  getErrorMessage(field: string): string {
    let retorno = "";
    if(this.f[field].hasError("required")) {
      retorno = "Empty.";
    }
    else if(this.f[field].getError('email')){
      retorno = "Invalid format";
    }
    return retorno;
  }

  isNotValidField(field: string): boolean {
    return (this.f[field].touched || this.f[field].dirty == true)
      && !this.f[field].valid;
  }

  onLogin(){
    this.cargando = true;
    this.error = false;
    this.auth.login(this.loginForm.value.email, this.loginForm.value.password).then((resp) => {
      if (resp) {
        let suscr = this.afs.getUsersWithFilter("email", this.loginForm.value.email).subscribe(user => {
            if(user){
              console.info(user);
              let userInterface = user[0] as UserInterface;
              this.auth.refreshData(userInterface);
              this.loginForm.reset();
              this.router.navigateByUrl('');
            }
            suscr.unsubscribe();
          });
      }
    }).catch(e => {
      this.errorMsj.next(e.message.toLowerCase().replace("firebase: ", ""));
      this.error = true;
      this.cargando = false;
      console.info("ERROR ->", e);
    });
  }

  loginWithUsersDefaults(email:string, password:string){
    this.f['email'].setValue(email);
    this.f['password'].setValue(password);
    this.onLogin();
  }
}
