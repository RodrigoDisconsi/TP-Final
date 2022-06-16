import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/UserInterface';
import { FirebaseService } from 'src/app/servicios/firebase-service.service';

@Component({
  selector: 'app-master-usuarios',
  templateUrl: './master-usuarios.component.html',
  styleUrls: ['./master-usuarios.component.scss']
})
export class MasterUsuariosComponent implements OnInit {

  public users!:UserInterface[];
  public nuevoUsuario:boolean = false;
  constructor(private afs:FirebaseService) { }

  ngOnInit(): void {
    this.afs.getAll('users').subscribe(resp => {
      this.users = resp as UserInterface[];
    })
  }

  onClick(){
    this.nuevoUsuario = true;
  }

  // exportExcel() {
  //   import("xlsx").then(xlsx => {
  //       const worksheet = xlsx.utils.json_to_sheet(this.sales); // Sale Data
  //       const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //       const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //       this.saveAsExcelFile(excelBuffer, "sales");
  //   });
  // }
  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   import("file-saver").then(FileSaver => {
  //     let EXCEL_TYPE =
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //     let EXCEL_EXTENSION = ".xlsx";
  //     const data: Blob = new Blob([buffer], {
  //       type: EXCEL_TYPE
  //     });
  //     FileSaver.saveAs(
  //       data,
  //       fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
  //     );
  //   });
  // }

}
