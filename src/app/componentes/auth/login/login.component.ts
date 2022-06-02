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
  
  public errorMsj = new Subject<string>();
  public error: boolean = false;
  public cargando: boolean = false;
  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private auth: AuthServiceService,
    private afs:FirebaseServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
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
        this.afs.getWithFilter('users', 'email', this.loginForm.value.email).subscribe(user => {
          if(user){
            let userInterface = user[0] as UserInterface;
            this.auth.refreshData(userInterface);
          }
        })
      }
    }).catch(e => {
      this.errorMsj.next(e.message);
      this.error = true;
      // this.cargando = false;
      console.info("ERROR ->", e);
    });
  }
}
