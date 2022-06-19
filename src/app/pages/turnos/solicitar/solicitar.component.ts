import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth-service.service';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';
import { ProgressComponent } from 'src/app/componentes/progress/progress.component';
import { UserInterface } from 'src/app/models/UserInterface';
import { Observable } from 'rxjs';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { Guid } from "guid-typescript";
import { MessageService } from 'primeng/api';
import { HorariosInterface } from 'src/app/models/horarios-interface';

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
  horarios!:HorariosInterface[] | null;
  especialidades!:string[] | null;
  turnoForm = this.formBuilder.group({
    especialidad: ['', [Validators.required]],
    especialista: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    estado: ['pendiente']
  });

  turnoAEnviar!:TurnoInterface;

  constructor(
    private auth:AuthService,
    private afs:FirebaseService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.paciente = this.auth.userObs;
    this.cargando = true;
    this.afs.getWithFilter('users', 'rol', 'especialista').subscribe(resp => {
      if(resp){
        this.listEspecialistas = resp as UserInterface[];
        this.listEspecialistas = this.listEspecialistas.filter(especialista => Array.isArray(especialista.horarios) && especialista.horarios.length > 0);
        this.cargando = false;
      }
    })
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

  onSelecEspecialista(esp:UserInterface | null, progress: ProgressComponent){
    if(esp){
      this.f['especialista'].setValue(esp);
      if(esp.especialidad){
        this.especialidades = esp.especialidad;
      }
      progress.next();
    }
  }

  onChangeEsp(progress:ProgressComponent){
    let espSelec = this.f['especialista'].value as UserInterface;
    let especialidadSelec = this.f['especialidad'].value;
    if(espSelec.horarios){
      this.horarios = espSelec.horarios.filter(horario => horario.esp == especialidadSelec);
      progress.next();
    }
  }

  onSelecFecha(fecha:string){
    this.f['fecha'].setValue(fecha);
  }

  getTurnoConPaciente(turno:TurnoInterface){
    this.turnoAEnviar = turno;
  }

  get turno():TurnoInterface{
    return this.turnoForm.value as TurnoInterface
  }

  enviarTurno(){
    this.cargando = true;
    this.turnoAEnviar.id = Guid.create().toString();
    this.afs.setObj("turnos", this.turnoAEnviar, this.turnoAEnviar.id).then(resp => {
      this.messageService.clear();
      this.messageService.add({severity:'success', summary:'Success', detail:'Su turno se envió correctamente!'},);
      this.cargando = false;
    })
  }
}
