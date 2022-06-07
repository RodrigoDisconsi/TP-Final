import { Component, OnInit } from '@angular/core';
import { ProgressComponent } from '../../progress/progress.component';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.scss']
})
export class TablaTurnosComponent implements OnInit {
  ngOnInit() {}

  goNext(progress: ProgressComponent) {
    progress.next();
  }

  onStateChange(event:any) {
    console.log(event);
  }

  ngAfterViewInit() {}

}
