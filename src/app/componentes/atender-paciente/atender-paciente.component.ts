import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-atender-paciente',
  templateUrl: './atender-paciente.component.html',
  styleUrls: ['./atender-paciente.component.scss']
})
export class AtenderPacienteComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder) { }


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
  }

}
