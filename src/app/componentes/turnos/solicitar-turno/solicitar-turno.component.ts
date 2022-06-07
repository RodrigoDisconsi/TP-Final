import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick1(){
    $(".container").addClass("center slider-two-active").removeClass("full slider-one-active");
  }


  onClick2(){
    $(".container").addClass("full slider-three-active").removeClass("center slider-two-active slider-one-active");
    let name = $(".name").val();
    if(name == ""){
      $(".yourname").html("Anonymous!");
    }
    else{
      $(".yourname").html(name);
    }
  }



}
