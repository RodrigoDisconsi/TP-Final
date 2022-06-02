import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserInterface } from 'src/app/models/UserInterface';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';
import { FirebaseServiceService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  @ViewChild('file')file!:ElementRef;
  public errorMsj = new Subject<string>();
  public error: boolean = false;
  public cargando: boolean = false;
  public regisForm = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]],
    edad: ['', [Validators.required, Validators.min(18), Validators.max(150)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rol: [{
      value: 'administrador',
      disabled: true
    }]
  });
  public archivoMsj:string = "No file chosen...";

  constructor(
    private router: Router,
    private auth: AuthServiceService,
    private afs:FirebaseServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.regisForm.controls;
  }

  getErrorMessage(field: string): string {
    let retorno = "";
    if(this.f[field].hasError("required")) {
      retorno = "Vacío.";
    }
    else if(this.f[field].getError('email')){
      retorno = "Formato de email inválido";
    }
    else if(this.f[field].getError('minlength') || this.f[field].getError('maxlength')){
      retorno = "Cantidad de caracteres inválido";
    }
    else if(this.f[field].getError('min')){
      retorno = "Tienes que ser mayor de edad";
    }
    else if(this.f[field].getError('max')){
      retorno = "Lo siento, dudamos que tenga esa edad.";
    }
    else if(this.f[field].getError('pattern')){
      retorno = "SÓLO NÚMEROS.";
    }
    return retorno;
  }

  isNotValidField(field: string): boolean {
    return (this.f[field].touched || this.f[field].dirty == true)
      && !this.f[field].valid;
  }

  uploadFile(){
    this.file.nativeElement.click();
  }

  onChangeFile(){
    this.archivoMsj = this.file.nativeElement.files[0].name;
  }

  onChangeSelect(){
    if(this.f["rol"].value == "especialista"){
      this.regisForm.addControl("especialidad", new FormControl('', Validators.required));
      this.regisForm.removeControl("obraSocial");
    }
    else if(this.f["rol"].value == "paciente"){
      this.regisForm.addControl("obraSocial", new FormControl('', Validators.required));
      this.regisForm.removeControl("especialidad");
    }
    let a = 1;
    
  }

  onCrear(){
    let user  = this.regisForm.value as UserInterface;
    this.auth.register(user.email, user.password).then((resp)=>{
      if(resp){
        user.habilitado = true;
        this.afs.setObj('users', user, user.email).then(x => {
          this.auth.refreshData(user);
          this.router.navigate(['']);
          this.cargando = false;
        });
      }
    })
    .catch(e => {
      this.errorMsj = e.message;
      this.error = true;
      this.cargando = false;
      console.info("ERROR ->", e);
    });
  }


}
