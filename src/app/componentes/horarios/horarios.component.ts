import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HorariosInterface } from 'src/app/models/horarios-interface';

interface Days {
  name: string
}

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {

  @Output() horarioEvent = new EventEmitter<HorariosInterface>();
  @Input() especialidades?:string[];

  especialidadesDisplay:any;
  
  selectedEsp!:string;
  selectedDay!: Days[];
  days!: Days[];

  minTime:Date = new Date();;
  maxTime:Date = new Date();
  timeDesdeValue!:Date;
  timeHastaValue!:Date;

  desde!:string;
  hasta!:string;
  


  constructor() {
    this.days = [
      {name: 'Lunes'},
      {name: 'Martes'},
      {name: 'Miercoles'},
      {name: 'Jueves'},
      {name: 'Viernes'},
      {name: 'Sabados'}
  ];
   }

  ngOnInit(): void {
    this.minTime.setHours(8);
    this.minTime.setMinutes(0);

    this.maxTime.setHours(17);
    this.maxTime.setMinutes(30);

    if(this.especialidades){      
      this.especialidadesDisplay = this.especialidades.map(esp => {
        return {
          name: esp
        }
      });
    }
  }

  onSelectTime(desde:boolean){
    if(desde){
      this.desde = this.getTime(this.timeDesdeValue);
    }
    else{
      this.hasta = this.getTime(this.timeHastaValue);
    }
  }

  getTime(date:Date):string{
    if(date.getMinutes() <= 15 || date.getMinutes() > 45){
      date.setMinutes(0);
    }
    else if(date.getMinutes() <= 45){
      date.setMinutes(30);
    }

    let minutes = date.getMinutes() < 10 ? date.getMinutes() + "0" : date.getMinutes();
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); 
    return hour + ":" + minutes;
  }

  onClickSave(){
    let horario:HorariosInterface = {
      dias: this.selectedDay.map(day => day.name),
      desde: this.desde,
      hasta: this.hasta,
      esp: this.selectedEsp
    }
    if(horario.dias.length > 0 && horario.desde && horario.hasta){
      this.horarioEvent.emit(horario);
    }

    
  }
}
