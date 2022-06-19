import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompletarSoliTurnoComponent } from '../../componentes/completar-soli-turno/completar-soli-turno.component';
import { MisTurnosComponent } from '../../pages/turnos/mis-turnos/mis-turnos.component';
import { SolicitarComponent } from '../../pages/turnos/solicitar/solicitar.component';
import { ProgressComponent } from '../../componentes/progress/progress.component';
import { ProgressStepComponent } from '../../componentes/progress/progress-step/progress-step.component';
import { ProgressStepDirective } from '../../directives/progress-step.directive';
import { CalendarComponent } from '../../componentes/calendar/calendar.component';
import { TablaUsersTurnoComponent } from '../../componentes/tabla-users-turno/tabla-users-turno.component';
import { TablaTurnosComponent } from '../../componentes/tabla-turnos/tabla-turnos.component';
import { CommentDialogTurnoComponent } from '../../componentes/comment-dialog-turno/comment-dialog-turno.component';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { LoadingModule } from 'src/app/componentes/loading/loading.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AtenderPacienteComponent } from 'src/app/componentes/atender-paciente/atender-paciente.component';

@NgModule({
  declarations: [
    CompletarSoliTurnoComponent,
    MisTurnosComponent,
    SolicitarComponent,
    ProgressComponent,
    ProgressStepComponent,
    ProgressStepDirective,
    CalendarComponent,
    TablaUsersTurnoComponent,
    TablaTurnosComponent,
    CommentDialogTurnoComponent,
    AtenderPacienteComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    LoadingModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    DialogModule
  ]
})
export class TurnosModule { }
