import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/servicios/auth-service.service';
import { FirebaseServiceService } from 'src/app/servicios/firebase-service.service';
import { ProgressComponent } from 'src/app/componentes/progress/progress.component';

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.scss']
})
export class SolicitarComponent implements OnInit {

  public cargando: boolean = false;
  public turnoForm = this.formBuilder.group({
    especialidad: ['', [Validators.required]],
    especialista: ['', [Validators.required]],
    usuario: ['', [Validators.required]],
    fecha: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
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

  goNext(progress: ProgressComponent) {
    progress.next();
  }

  onStateChange(event:any) {
    console.log(event);
  }

  ngAfterViewInit() {}

}
