import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    constructor() { }
    

    ngOnInit(): void {
    }

    //como cargar una imagen progresivamente
    // @ViewChild('solidbox') solidBox!:ElementRef;
    // @ViewChild('solid') solid!:ElementRef;
    // width = 100;
    
    // slide = setInterval(() => {
    //     this.solid.nativeElement.style.width = `${this.width}%`;
    //     this.width -= 1;
    // }, 20)

    // setTimeout(() => {
    //     clearInterval(this.slide);
    //     this.solid.nativeElement.style.width = `100%`;
    // }, 2050);
    
    // setInterval(() => {

    //     this.width = 100;
    //     let slide = setInterval(() => {
    //         this.solid.nativeElement.style.width = `${this.width}%`;
    //         this.width -= 1;
    //     }, 20)

    //     setTimeout(() => {
    //         clearInterval(slide);
    //     }, 2050);

    // }, 2050);
}
