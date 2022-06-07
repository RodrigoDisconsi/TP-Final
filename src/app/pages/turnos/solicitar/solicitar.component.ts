import { Component, OnInit } from '@angular/core';
import { ProgressComponent } from 'src/app/componentes/progress/progress.component';

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.scss']
})
export class SolicitarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goNext(progress: ProgressComponent) {
    progress.next();
  }

  onStateChange(event:any) {
    console.log(event);
  }

  ngAfterViewInit() {}

}
