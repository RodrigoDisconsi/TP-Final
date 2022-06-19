import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HorariosInterface } from 'src/app/models/horarios-interface';
import { decodedTextSpanIntersectsWith } from 'typescript';

export enum EDays{
  "Lunes" = 1,
  "Martes" = 2,
  "Miercoles" = 3,
  "Jueves" = 4,
  "Viernes" = 5,
  "Sabado" = 6
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Output() fechaSeleccionada = new EventEmitter<string>();
  @Input() horarios!: HorariosInterface[];
  fechaSelec:string = "";
  horaSelec:string = "";
  dias:string[];
  horas!:string[];

  constructor() {
    this.dias = [];
  }

  ngOnInit(): void {
    this.horarios.forEach(horario => {
      this.setHours(horario);
      this.setDays(horario);
    })
  }

  setDays(horario:HorariosInterface){
    let dateNow = new Date();
    let currentDay:number;
    for (let day = 1; day <= 15; day++) {
      currentDay = dateNow.getDay();
      if(horario.dias.find(dia => dia == EDays[currentDay])){
        this.dias.push(dateNow.getDate() + "/" + (dateNow.getMonth() + 1) + "/" + dateNow.getFullYear());
      }

      dateNow.setDate(dateNow.getDate() + 1);
    }
  }

  setHours(horario:HorariosInterface){
      let desde = Number.parseInt(horario.desde);
      let hasta = Number.parseInt(horario.hasta); 
      let stringToAdd = "";
      this.horas = [horario.desde];
      for (let currentNumber = desde + 1; currentNumber < hasta; currentNumber++) {
  
        if(currentNumber >= 10)
          stringToAdd = currentNumber.toString() + ":" + "00";
        else
          stringToAdd = "0" + currentNumber.toString() + ":" + "00";
        this.horas.push(stringToAdd);
      }
      this.horas.push(horario.hasta);
  }

  onSelectDate(date:any){
    this.fechaSelec = date.value;
    if(this.horaSelec != ""){
      this.fechaSelec = this.fechaSelec + " - " + this.horaSelec;
      this.fechaSeleccionada.emit(this.fechaSelec);
    }
  }

  onSelectTime(time:any){
    this.horaSelec = time.value;
    if(this.fechaSelec != ""){
      this.fechaSelec = this.fechaSelec + " - " + this.horaSelec;
      this.fechaSeleccionada.emit(this.fechaSelec);
    }
  }
}
