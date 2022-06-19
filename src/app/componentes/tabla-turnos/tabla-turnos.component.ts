import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TurnoInterface } from 'src/app/models/turno-interface';
import { UserInterface } from 'src/app/models/UserInterface';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.scss']
})
export class TablaTurnosComponent implements OnInit {

  @Input() user!:UserInterface;
  displayModal:boolean = false;
  turnos!:TurnoInterface[];
  filter!:string;
  activeSearch:boolean = false;
  turnosWithoutFilter!:TurnoInterface[];
  headerColumn:string = "";
  titleDialog:string = "";
  estadoTurno!:string;
  turnoSelecc!:TurnoInterface;
  viewComent:boolean = false;
  displayModalAtender:boolean = false;
  loading:boolean = false;

  constructor(
    private afs:FirebaseService
  ) { }

  ngOnInit(): void {
    if(this.user.rol == "administrador" ){
      //todo 
    }
    else{
      if(this.user.rol == "paciente"){
        this.afs.getTurnoByPaciente(this.user.email).subscribe(resp =>{
          this.headerColumn = "Especialista";
          this.turnos = resp as TurnoInterface[];
          this.turnosWithoutFilter = this.turnos;
        });
      }
      else{
        this.afs.getTurnoByEspecialista(this.user.email).subscribe(resp =>{
          this.headerColumn = "Paciente";
          this.turnos = resp as TurnoInterface[];
          this.turnosWithoutFilter = this.turnos;
        });
      }
    }
  }

  onFilter(){
    this.turnos = this.turnosWithoutFilter.filter(turno => turno.especialidad.toLowerCase().includes(this.filter.toLowerCase()) || 
                                       turno.especialista.nombre.toLowerCase().includes(this.filter.toLowerCase()) ||
                                       turno.especialista.apellido.toLowerCase().includes(this.filter.toLowerCase()))
  }

  confirmTurno(turno:TurnoInterface){
    turno.estado = "aceptado";
    Swal.fire({
      title: "Desea aceptar el turno?",
      text: "Esto no se puede revertir!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      cancelButtonColor: '#7066e0',
      reverseButtons: false,
      allowOutsideClick: false,
    }).then((result:any) => {
      if (result.isConfirmed){
        this.loading = true;
        this.afs.setObj("turnos", turno).then(x => {
          Swal.fire({
            title: 'Turno actualizado',
            icon: 'success',
            timer: 1000
          });
          this.loading = false;
        }).catch(e => {
          Swal.fire({
            title: 'Canceled!',
            icon: 'error',
            timer: 1000
          });
          this.loading = false;
        })
      } 
    });

  }

  openDialogComment(turno:TurnoInterface, estado:string, title:string){
    this.viewComent = false;
    this.estadoTurno = estado;
    this.turnoSelecc = turno;
    this.titleDialog = title;
    this.displayModal = true;
  }

  openDialogViewComment(turno:TurnoInterface){
    this.viewComent = true;
    this.turnoSelecc = turno;
    this.displayModal = true;
  }

  sendComment(comentario:string){
    if(comentario != ""){
      this.turnoSelecc.comentario = comentario;
      this.turnoSelecc.estado = this.estadoTurno;
      this.afs.setObj("turnos", this.turnoSelecc).then(resp =>{
        Swal.fire({
          title: 'Correc!',
          icon: 'success',
          timer: 1000
        });
        this.displayModal = false;
      })
      .catch(e => {
        Swal.fire({
          title: 'Canceled!',
          icon: 'error',
          timer: 1000
        });
        this.displayModal = false;
      });
    }
    else
      this.displayModal = false;
  }


  finalizarTurno(){
    this.displayModalAtender = true;
  }

}
