import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  dateValue:Date = new Date();
  maxDateValue:Date = new Date();
  minDateTest:Date = new Date();
  value!:Time;

  constructor() {
    this.maxDateValue.setDate(this.dateValue.getDate() + 15);
    this.minDateTest.setHours(7);
    this.minDateTest.setMinutes(0);
   }

  ngOnInit(): void {
  }

  onClick(){
    console.info(this.dateValue);
  }

}
