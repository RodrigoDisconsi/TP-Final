import { Component, OnInit } from '@angular/core';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { UserInterface } from 'src/app/models/UserInterface';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {

  turnos!:TurnoInterface[];
  usersLog!:UserInterface[];
  options = {
    responsive: false,
    maintainAspectRatio: false
  };


  constructor(private afs:FirebaseService) { }

  ngOnInit(): void {
    this.afs.getAll("turnos").subscribe(resp =>{
      this.turnos = resp as TurnoInterface[];
    });
    this.afs.getAll("users").subscribe(usersAfs => {
      this.usersLog = usersAfs as UserInterface[];
    });
  }

  SavePDF(): void {  
    let DATA:any = document.getElementById('exportPdf');
    let logo = new Image()
    logo.src = '../../../assets/logo.png'; 

    let date = new Date();
    let fecha = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      PDF.text("Fecha Emisión: " + fecha, 100, 10);
      PDF.addImage(logo, 'PNG', 0, 0, 50, 20)
      PDF.addImage(FILEURI, 'PNG', 0, 20, fileWidth, fileHeight);
      PDF.save('Estadisticas.pdf');
    });
  }  

}
