import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/UserInterface';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';
import * as FileSaver from 'file-saver';
import { TurnoInterface } from 'src/app/models/turno-interface';

@Component({
  selector: 'app-master-usuarios',
  templateUrl: './master-usuarios.component.html',
  styleUrls: ['./master-usuarios.component.scss']
})
export class MasterUsuariosComponent implements OnInit {

  users!:UserInterface[];
  ultimosTurnos!:TurnoInterface[];
  displayDialogNewUser:boolean = false;

  constructor(private afs:FirebaseService) { }

  ngOnInit(): void {
    this.afs.getAll('users').subscribe(resp => {
      this.users = resp as UserInterface[];
    });

    this.afs.getWithFilter('turnos', 'estado', 'realizado').subscribe(resp => {
      let turnos = resp as TurnoInterface[];
      this.ultimosTurnos = turnos.sort((a, b) => {
        let retorno:number = 0;
        if(a.fecha && b.fecha){
          let fechaA = a.fecha?.split(" - ")[0].split("/");
          let fechaB = b.fecha?.split(" - ")[0].split("/");
          let dayA = parseInt(fechaA[0]);
          let montA = parseInt(fechaA[1]);
          let yearA = parseInt(fechaA[2]);
          let dayB = parseInt(fechaB[0]);
          let montB = parseInt(fechaB[1]);
          let yearB = parseInt(fechaB[2]);
          
          if(yearA > yearB)
            return -1;
          else if(yearA < yearB)
            return 1;
          else{
            if(montA > montB)
              return -1;
            else if(montA < montB)
              return 1;
            else{
              if(dayA > dayB)
              return -1;
            else if(dayA < dayB)
              return 1;
            }
          }
        }
        else if(a.fecha && !b.fecha){
          retorno = -1;
        }
        else if(!a.fecha && b.fecha){
          retorno = 1;
        }

        return retorno;
      }).slice(0, 3);
    });
  }

  onClick(){
    this.displayDialogNewUser = true;
  }

  exportExcel(data:any, file:string) {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(data); // Sale Data
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, file);
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
  }

  exportTurno(turnos:TurnoInterface[]){
    let obj = turnos.map(turno => {
      return {
        Especialidad: turno.especialidad,
        Especialista: turno.especialista.nombre + " " + turno.especialista.apellido,
        Fecha: turno.fecha,
        Diagnostico: turno.diagnostico,
        Comentario: turno.comentario
      }
    });
    let nombreArchivo =  "HL-" + turnos[0].paciente.nombre + "-" + turnos[0].paciente.apellido;
    this.exportExcel(obj, nombreArchivo);

  }

}
