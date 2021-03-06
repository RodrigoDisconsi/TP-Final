import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserInterface } from 'src/app/models/UserInterface';
import { AuthService } from 'src/app/servicios/auth-service.service';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';

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
      value: 'administrador'
    }]
  });
  public archivoMsj:string = "No file chosen...";
  public archivo:any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private afs:FirebaseService,
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
    let file = this.file.nativeElement.files[0];
    this.archivoMsj = file.name;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.archivo = reader.result;
    };
  }

  onCrear(){
    let user  = this.regisForm.value as UserInterface;
    this.cargando = true;
    this.auth.register(user.email, user.password).then((resp)=>{
      if(resp){
        if(this.archivo){
          this.afs.uploadImage(user.email, this.archivo).then(img =>{
              user.habilitado = true;
              if(img)
                user.pathImg = img;
              this.afs.setObj('users', user, user.email).then(x => { 
                this.router.navigate(['']);
                this.regisForm.reset();
                this.cargando = false;
              });
          }).catch(e =>{
            this.errorMsj.next(e.message);
            this.error = true;
            this.cargando = false;            
          });
        }
      }
    })
    .catch(e => {
      this.errorMsj.next(e.message);
      this.error = true;
      this.cargando = false;
    });
  }


}
