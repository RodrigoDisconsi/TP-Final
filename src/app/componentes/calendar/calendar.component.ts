import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Message,MessageService} from 'primeng/api';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [MessageService]
})
export class CalendarComponent implements OnInit {

  @Output() fechaSeleccionada = new EventEmitter<Date>();

  msgs1!: Message[];

  dateValue!:Date;
  minDateValue:Date = new Date();
  maxDateValue:Date = new Date();
  minTime:Date = new Date();;
  maxTime:Date = new Date();
  timeValue!:Date;
  
  timeToReturn!:Date;

  constructor(private messageService: MessageService) {
   }

  ngOnInit(): void {
    this.maxDateValue.setDate(this.minDateValue.getDate() + 15);
    this.minTime.setHours(8);
    this.minTime.setMinutes(0);

    this.maxTime.setHours(17);
    this.maxTime.setMinutes(30);

  }

  onSelectDate(){
    this.timeToReturn = this.dateValue;
    console.info(this.timeToReturn);
    if(this.timeValue){
      this.timeToReturn.setTime(this.timeValue.getTime());
      //emit
      this.fechaSeleccionada.emit(this.timeToReturn);
    }
  }

  onSelectTime(){
    if(this.timeValue.getMinutes() <= 15 || this.timeValue.getMinutes() > 45){
      this.timeValue.setMinutes(0);
    }
    else if(this.timeValue.getMinutes() <= 45){
      this.timeValue.setMinutes(30);
    }

    if(this.timeToReturn){
      this.timeToReturn.setTime(this.timeValue.getTime());
      this.fechaSeleccionada.emit(this.timeToReturn);
    }
    // this.messageService.clear();
    // this.messageService.add({severity:'error', summary:'Error', detail:'Message Content'});
  }
}
