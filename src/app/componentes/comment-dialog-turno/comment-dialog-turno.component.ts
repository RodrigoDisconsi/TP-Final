import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-dialog-turno',
  templateUrl: './comment-dialog-turno.component.html',
  styleUrls: ['./comment-dialog-turno.component.scss']
})
export class CommentDialogTurnoComponent implements OnInit {

  @Output() comentarioEvent = new EventEmitter<string>();
  @Input() title!:string;
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
    this.comentarioEvent.emit("");
  }

  onFinish(){
    this.comentarioEvent.emit(this.comentarioForm.value.comentario);
  }

}
