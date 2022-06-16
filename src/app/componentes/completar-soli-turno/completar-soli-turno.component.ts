import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { UserInterface } from 'src/app/models/UserInterface';

@Component({
  selector: 'app-completar-soli-turno',
  templateUrl: './completar-soli-turno.component.html',
  styleUrls: ['./completar-soli-turno.component.scss']
})
export class CompletarSoliTurnoComponent implements OnInit {

  @Input() paciente!:UserInterface;
  @Input() turno!:TurnoInterface;
  @Output() turnoEmit = new EventEmitter<TurnoInterface>();

  constructor( 
  ) { }

  ngOnInit(): void {
    if(this.paciente.rol == "paciente"){
      this.turno.paciente = this.paciente;
      this.turnoEmit.emit(this.turno);
    }
  }
}
