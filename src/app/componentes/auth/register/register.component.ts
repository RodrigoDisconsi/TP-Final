import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserInterface } from 'src/app/models/UserInterface';
import { AuthService } from 'src/app/servicios/auth-service.service';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('file')file!:ElementRef;
  @Output() test = new EventEmitter<boolean>();

  errorMsj = new Subject<string>();
  error: boolean = false;
  cargando: boolean = false;
  regisForm = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[0-9]*$")]],
    edad: ['', [Validators.required, Validators.min(18), Validators.max(150)]],
    obraSocial: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rol: ['', [Validators.required]]
  });
  archivoMsj:string = "No file chosen...";
  archivo:any;
  especialidades:any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private afs:FirebaseService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.afs.getAll("especialidades").subscribe(resp => {
      if(resp){
        this.especialidades = resp;
      }
    });
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
      retorno = "Sólo valores númericos.";
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
    let reader = new FileReader();
    this.archivoMsj = file.name;
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.archivo = reader.result;
    };
  }

  setRol(rol:string){
    this.f["rol"].setValue(rol);
    if(this.f["rol"].value == "especialista"){
      this.regisForm.addControl("especialidad", new FormControl('', Validators.required));
      this.regisForm.removeControl("obraSocial");
    }
    else if(this.f["rol"].value == "paciente"){
      this.regisForm.addControl("obraSocial", new FormControl('', Validators.required));
      this.regisForm.removeControl("especialidad");
    }
    this.test.emit(true);
  }

  onRegister(){
    let user  = this.regisForm.value as UserInterface;
    this.cargando = true;
    if(this.archivo){
      this.auth.register(user.email, user.password).then((resp)=>{
        if(resp){
            this.afs.uploadImage(user.email, this.archivo).then(img =>{
                user.habilitado = true;
                if(img)
                  user.pathImg = img;
                this.afs.setObj('users', user, user.email).then(x => {
                  this.auth.refreshData(user); 
                  this.router.navigate(['']);
                  this.regisForm.reset();
                  this.cargando = false;
                });
            }).catch(e =>{
              this.errorMsj = e.message;
              this.error = true;
              this.cargando = false;            
            });
        }
      })
      .catch(e => {
        this.errorMsj = e.message;
        this.error = true;
        this.cargando = false;
      });
    }
    else{
      this.error = true;
      this.errorMsj.next("Falta u archivo");
    }
  }

  showResponse(event:any){

  }

}
