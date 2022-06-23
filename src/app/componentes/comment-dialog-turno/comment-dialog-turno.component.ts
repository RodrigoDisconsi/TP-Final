import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-dialog-turno',
  templateUrl: './comment-dialog-turno.component.html',
  styleUrls: ['./comment-dialog-turno.component.scss']
})
export class CommentDialogTurnoComponent implements OnInit {

  @Output() comentarioEvent = new EventEmitter<{ cmt:string, rating:number} | null>();
  @Input() title!:string;
  @Input() calificar:boolean = false;
  calificacion!:number;
  public comentarioForm = this.formBuilder.group({
    comentario: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.comentarioForm.controls;
  }

  getErrorMessage(field: string): string {
    let retorno = "";
    if(this.f[field].hasError("required")) {
      retorno = "El comentario es obligatorio.";
    }
    return retorno;
  }

  isNotValidField(field: string): boolean {
    return (this.f[field].touched || this.f[field].dirty == true)
      && !this.f[field].valid;
  }

  onCancel(){
    this.comentarioEvent.emit(null);
  }

  onFinish(){
    let emit = {
      cmt: this.comentarioForm.value.comentario,
      rating: this.calificacion ? this.calificacion : -1
    }
    this.comentarioEvent.emit(emit);
  }

}
