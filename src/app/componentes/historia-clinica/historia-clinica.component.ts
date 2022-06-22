import { Component, Input, OnInit } from '@angular/core';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { UserInterface } from 'src/app/models/UserInterface';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {
  
  @Input() paciente!:UserInterface;
  @Input() showHead:boolean = false;
  filterHistoriaClinica!:TurnoInterface[];
  historiaClinica!:TurnoInterface[];
  activeSearch:boolean = false;
  filter!:string;

  constructor(private afs:FirebaseService) { }

  ngOnInit(): void {
      this.afs.getTurnoRealizado("paciente.email", this.paciente.email).subscribe(resp => {
        if(resp){
          this.historiaClinica = resp as TurnoInterface[];
          this.filterHistoriaClinica = this.historiaClinica;
        }
      });
  }

  SavePDF(): void {  
    let id = this.showHead ? 'cont-pdf' : 'profile';
    let DATA:any = document.getElementById(id);
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
      PDF.save('historia-clinica.pdf');
    });
  }  

  onFilter(){
    this.filter = this.filter.toLowerCase();
    this.filterHistoriaClinica = this.historiaClinica.filter(hist => hist.especialidad.toLowerCase().includes(this.filter));
  }

}
