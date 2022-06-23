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
  califica:boolean = false;

  constructor(
    private afs:FirebaseService
  ) { }

  ngOnInit(): void {
    if(this.user.rol == "administrador" ){
      this.afs.getAll("turnos").subscribe(resp => {
        this.turnos = resp as TurnoInterface[];
        this.turnosWithoutFilter = this.turnos;
      });
    }
    else{
      if(this.user.rol == "paciente"){
        this.afs.getTurnoByPaciente(this.user.email).subscribe(resp =>{
          this.headerColumn = "Especialista";
          this.turnos = resp as TurnoInterface[];
          this.turnosWithoutFilter = this.turnos;
        });
      }
      else if(this.user.rol == "especialista"){
        this.afs.getTurnoByEspecialista(this.user.email).subscribe(resp =>{
          this.headerColumn = "Paciente";
          this.turnos = resp as TurnoInterface[];
          this.turnosWithoutFilter = this.turnos;
          console.info(this.turnos);
        });
      }
    }
  }

  onFilter(){
    this.turnos = this.turnosWithoutFilter.filter(turno => {
      let retorno = false;
      retorno = turno.especialidad.toLowerCase().includes(this.filter.toLowerCase()) || 
                                       turno.especialista.nombre.toLowerCase().includes(this.filter.toLowerCase()) ||
                                       turno.especialista.apellido.toLowerCase().includes(this.filter.toLowerCase());
      if(turno.historiaClinica){
        retorno = retorno || turno.historiaClinica.peso.toLowerCase().includes(this.filter.toLowerCase()) || 
        turno.historiaClinica.altura.toLowerCase().includes(this.filter.toLowerCase()) || 
        turno.historiaClinica.temperatura.toLowerCase().includes(this.filter.toLowerCase()) || 
        turno.historiaClinica.presion.toLowerCase().includes(this.filter.toLowerCase())

        if(turno.historiaClinica.camposDinamicos){
          retorno = retorno || turno.historiaClinica.camposDinamicos.filter(value => value.valor.toLowerCase().includes(this.filter.toLocaleLowerCase()) || 
                                                              value.clave.toLowerCase().includes(this.filter.toLocaleLowerCase())).length > 0
        }
      }
      return retorno;
    })
  }

  confirmTurno(turno:TurnoInterface){
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
        turno.estado = "aceptado";
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
          turno.estado = "pendiente";
          this.loading = false;
        })
      } 
    });

  }

  openDialogComment(turno:TurnoInterface, estado:string, title:string, califica:boolean = false){
    this.viewComent = false;
    this.estadoTurno = estado;
    this.turnoSelecc = turno;
    this.titleDialog = title;
    this.califica = califica;
    this.displayModal = true;
  }

  openDialogViewComment(turno:TurnoInterface){
    this.viewComent = true;
    this.turnoSelecc = turno;
    this.califica = false;
    this.displayModal = true;
  }

  sendComment(obj:{cmt:string, rating:number} | null){
    if(obj){
      if(obj.cmt != ""){
        if(obj.rating >= 0){
          this.turnoSelecc.calificacion = obj.rating;
          this.turnoSelecc.calificacionCmt = obj.cmt;
        }
        else{          
          this.turnoSelecc.estado = this.estadoTurno;
          this.turnoSelecc.comentario = obj.cmt;
        }
        this.afs.setObj("turnos", this.turnoSelecc).then(resp =>{
          Swal.fire({
            title: 'Correc!',
            icon: 'success',
            timer: 1000
          });
          this.displayModal = false;
          this.califica = true;
        })
        .catch(e => {
          Swal.fire({
            title: 'Canceled!',
            icon: 'error',
            timer: 1000
          });
          this.displayModal = false;
          this.califica = true;
        });
      }
    }
    else{
      this.displayModal = false;
      this.califica = true;
    }
  }


  atenderTurno(turno:TurnoInterface){
    this.turnoSelecc = turno;
    this.displayModalAtender = true;
  }

  finalizarTurno(turno:TurnoInterface){
    turno.estado = "realizado";
    this.loading = true;
    this.afs.setObj("turnos", turno).then(resp =>{
      Swal.fire({
        title: 'Correc!',
        icon: 'success',
        timer: 1000
      });
      this.displayModalAtender = false;
      this.loading = false;
    })
    .catch(e => {
      Swal.fire({
        title: 'Ups!',
        icon: 'error',
        timer: 1000
      });
      this.loading = false;
      this.displayModal = false;
    });
  }

}
