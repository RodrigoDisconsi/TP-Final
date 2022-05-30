import { animation, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  @ViewChild('testtt')testt!:ElementRef;

  visible:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  test(){
    this.visible = !this.visible;

  }

}
