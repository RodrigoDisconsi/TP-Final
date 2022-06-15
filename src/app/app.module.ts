import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './componentes/auth/login/login.component';
import { RegisterComponent } from './componentes/auth/register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { LoadingComponent } from './componentes/loading/loading.component';
import { TablaUsuariosComponent } from './componentes/tabla-usuarios/tabla-usuarios.component';
import { MasterUsuariosComponent } from './pages/master-usuarios/master-usuarios.component';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';
import { SolicitarComponent } from './pages/turnos/solicitar/solicitar.component';
import { ProgressComponent } from './componentes/progress/progress.component';
import { ProgressStepComponent } from './componentes/progress/progress-step/progress-step.component';
import { ProgressStepDirective } from './directives/progress-step.directive';



import { CalendarComponent } from './componentes/calendar/calendar.component';
import { TablaUsersTurnoComponent } from './componentes/tabla-users-turno/tabla-users-turno.component';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { CaptchaModule } from 'primeng/captcha';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';


import { CompletarSoliTurnoComponent } from './componentes/completar-soli-turno/completar-soli-turno.component';
import { MisTurnosComponent } from './pages/turnos/mis-turnos/mis-turnos.component';
import { TablaTurnosComponent } from './componentes/tabla-turnos/tabla-turnos.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HorariosComponent } from './componentes/horarios/horarios.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MainComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    LoadingComponent,
    TablaUsuariosComponent,
    MasterUsuariosComponent,
    CrearUsuarioComponent,
    SolicitarComponent,
    ProgressComponent,
    ProgressStepComponent,
    ProgressStepDirective,
    CalendarComponent,
    TablaUsersTurnoComponent,
    CompletarSoliTurnoComponent,
    MisTurnosComponent,
    TablaTurnosComponent,
    ProfileComponent,
    HorariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CalendarModule,
    MessagesModule,
    MessageModule,
    CaptchaModule,
    DialogModule,
    ButtonModule,
    MultiSelectModule,
    ToastModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
