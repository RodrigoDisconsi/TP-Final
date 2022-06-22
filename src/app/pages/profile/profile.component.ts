import { Component, ElementRef, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { HorariosInterface } from 'src/app/models/horarios-interface';
import { UserInterface } from 'src/app/models/UserInterface';
import { AuthService } from 'src/app/servicios/auth-service.service';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit { 

  $user!:Observable<UserInterface | null>;
  displayModal: boolean = false;


  constructor(private auth:AuthService, private afs:FirebaseService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.$user = this.auth.userObs;
  }

  showModalDialog() {
    this.displayModal = true;
  }

  enviarHorario(horario:HorariosInterface, user:UserInterface){
    if(!user.horarios){
      user.horarios = [horario];
    }
    user.horarios.push(horario);
    this.afs.setObj("users", user, user.email).then(resp => {
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Horario agregado!'});
    });
  }

  // SavePDF(): void {  
  //   let DATA:any = document.getElementById('profile');
  //   let logo = new Image()
  //   logo.src = '../../../assets/logo.png'; 

  //   let date = new Date();
  //   let fecha = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  //   html2canvas(DATA).then((canvas) => {
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     const FILEURI = canvas.toDataURL('image/png');
  //     let PDF = new jsPDF('p', 'mm', 'a4');
  //     PDF.text("Fecha Emisión: " + fecha, 100, 10);
  //     PDF.addImage(logo, 'PNG', 0, 0, 50, 20)
  //     PDF.addImage(FILEURI, 'PNG', 0, 20, fileWidth, fileHeight);
  //     PDF.save('historia-clinica.pdf');
  //   });
  // }  
}
