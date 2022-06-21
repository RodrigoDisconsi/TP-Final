import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HistoriaClinicaInterface } from 'src/app/models/historia-clinica-interface';
import { TurnoInterface } from 'src/app/models/turno-interface';

@Component({
  selector: 'app-atender-paciente',
  templateUrl: './atender-paciente.component.html',
  styleUrls: ['./atender-paciente.component.scss']
})
export class AtenderPacienteComponent implements OnInit {

  @Input() turno!:TurnoInterface;
  @Output() turnoWithHistoriaClin = new EventEmitter<TurnoInterface>();

  evaluacionForm = this.formBuilder.group({
    comentario: ['', [Validators.required]],
    diagnostico: ['', [Validators.required]]
  });

  historiaClinicaForm = this.formBuilder.group({
    altura: ['', [Validators.required]],
    peso: ['', [Validators.required]],
    temperatura: ['', [Validators.required]],
    presion: ['', [Validators.required]]
  });

  camposDinamicos!:{clave:string,valor:string}[];

  constructor(private formBuilder: FormBuilder) { 
  }


  get evalForm(): { [key: string]: AbstractControl } {
    return this.evaluacionForm.controls;
  }

  get histClinicForm(): { [key: string]: AbstractControl } {
    return this.evaluacionForm.controls;
  }

  getErrorMessage(control: AbstractControl): string {
    let retorno = "";
    if(control.hasError("required")) {
      retorno = "El comentario es obligatorio.";
    }
    return retorno;
  }

  isNotValidField(control: AbstractControl): boolean {
    return (control.touched || control.dirty == true)
      && !control.valid;
  }

  ngOnInit(): void {
    this.clearData();
  }

  agregarCampoDinamico(){
    if(this.camposDinamicos.length < 3){
      this.camposDinamicos.push({
        clave: "",
        valor: ""
      });
    }
  }

  quitarCampoDinamico(){
    this.camposDinamicos.pop();
  }

  finalizarTurno(){
    this.turno.comentario = this.evalForm['comentario'].value;
    this.turno.diagnostico = this.evalForm['diagnostico'].value;
    let camposDin = this.camposDinamicos.filter(camp => camp.clave != "" && camp.valor != "");
    if(camposDin.length > 0){
      this.historiaClinicaForm.addControl("camposDinamicos", new FormControl(camposDin));
    }
    this.turno.historiaClinica = this.historiaClinicaForm.value as HistoriaClinicaInterface;
    this.turnoWithHistoriaClin.emit(this.turno);
  }

  clearData(){
    this.historiaClinicaForm.reset();
    this.evaluacionForm.reset();
    this.camposDinamicos  = [{
      clave: "",
      valor: ""
    }];
  }
}
