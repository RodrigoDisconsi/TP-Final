import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAccentColor]'
})
export class AccentColorDirective {

  constructor(private el:ElementRef) {
    this.el.nativeElement.style.color = "#4285F4";
   }

}
