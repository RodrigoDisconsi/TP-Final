import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appEstadoColor]'
})
export class EstadoColorDirective {
  
  @Input('appEstadoColor') appEstadoColor!:string;
  constructor(private el: ElementRef) { 
    if(this.appEstadoColor == "realizado"){
      this.el.nativeElement.style.backgroundColor = "#3ac47d";
    }
    else if(this.appEstadoColor == 'pendiente'){
      this.el.nativeElement.style.backgroundColor = "#f7b924";
    }
    else if(this.appEstadoColor == 'aceptado'){
      this.el.nativeElement.style.backgroundColor = "#16aaff";
    }
    else{
      this.el.nativeElement.style.backgroundColor = "#d92550";
    }
  }

}
