import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  heightPanelOne!:number;
  heightPanelTwo!:number;

  visible:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.heightPanelOne = $('.form-panel.two').height();
    this.heightPanelTwo = $('.form-panel.two')[0].scrollHeight;
  }

  onClick(close:boolean){
    if(close){      
      this.visible = false;
      $('.form').animate({
        'height': this.heightPanelOne
      }, 200);
    }
    else{
      this.visible = true;
      $('.form').animate({
        'height': this.heightPanelTwo
      }, 200);
    }
  }
}
