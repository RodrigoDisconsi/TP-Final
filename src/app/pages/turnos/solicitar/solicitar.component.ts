import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';
import { FirebaseServiceService } from 'src/app/servicios/firebase-service.service';
import { ProgressComponent } from 'src/app/componentes/progress/progress.component';
import { UserInterface } from 'src/app/models/UserInterface';
import { Observable } from 'rxjs';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { Guid } from "guid-typescript";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.scss'],
  providers: [MessageService]
})
export class SolicitarComponent implements OnInit {

  cargando: boolean = false;
  listEspecialistas!:UserInterface[];
  paciente!:Observable<UserInterface | null>;
  turnoForm = this.formBuilder.group({
    especialidad: ['', [Validators.required]],
    especialista: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    estado: ['pendiente']
  });

  turnoAEnviar!:TurnoInterface;

  constructor(
    private auth:AuthServiceService,
    private afs:FirebaseServiceService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.paciente = this.auth.userObs;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.turnoForm.controls;
  }

  getErrorMessage(field: string): string {
    let retorno = "";
    if(this.f[field].hasError("required")) {
      retorno = "Vacío.";
    }
    return retorno;
  }

  isNotValidField(field: string): boolean {
    return (this.f[field].touched || this.f[field].dirty == true)
      && !this.f[field].valid;
  }

  onStateChange(event:any) {
    console.log(event);
  }

  ngAfterViewInit() {}

  onChangeEsp(progress: ProgressComponent){
    this.cargando = true;
    this.afs.getWithFilter('users', 'especialidad', this.f['especialidad'].value).subscribe(resp => {
      if(resp){
        this.listEspecialistas = resp as UserInterface[]
        this.cargando = false;
        progress.next();
      }
    })
  }

  onSelecEspecialista(esp:UserInterface | null, progress: ProgressComponent){
    if(esp){
      this.f['especialista'].setValue(esp);
      //TODO TRAER HORARIOS Y TURNOS 
      progress.next();
    }
  }

  onSelecFecha(fecha:Date){
    let aux = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " a las " 
      + fecha.getHours() + ":";
    let minutos = fecha.getMinutes();
    if(minutos == 0){
      aux += "00";
    }
    else if(minutos < 10){
      aux += "0" + minutos;
    }
    else {
      aux += minutos;
    }
    this.f['fecha'].setValue(aux);
    //TODO VALIDAR FECHA CON TURNSO ANTERIORMENTE OBTENIDOS Y FIJARME QUE VOY A HACER CON EL TIPO ADMIN
  }

  getTurnoConPaciente(turno:TurnoInterface){
    this.turnoAEnviar = turno;
    console.info(this.turnoAEnviar);
  }

  get turno():TurnoInterface{
    return this.turnoForm.value as TurnoInterface
  }

  enviarTurno(){
    this.cargando = true;
    console.info(this.turnoAEnviar);
    this.afs.setObj("turnos", this.turnoAEnviar, Guid.create().toString()).then(resp => {
      this.messageService.clear();
      this.messageService.add({severity:'success', summary:'Success', detail:'Su turno se envió correctamente!'},);
      this.cargando = false;
    })
  }
}
