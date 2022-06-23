import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/UserInterface';

@Component({
  selector: 'app-table-log-users',
  templateUrl: './table-log-users.component.html',
  styleUrls: ['./table-log-users.component.scss']
})
export class TableLogUsersComponent implements OnInit {

  
  @Input() users!:UserInterface[];
  constructor() { }

  ngOnInit(): void {
  }

}
