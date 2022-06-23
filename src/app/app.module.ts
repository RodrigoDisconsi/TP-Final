import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { TablaUsuariosComponent } from './componentes/tabla-usuarios/tabla-usuarios.component';
import { MasterUsuariosComponent } from './pages/master-usuarios/master-usuarios.component';
import { CrearUsuarioComponent } from './componentes/crear-usuario/crear-usuario.component';

import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

import { ProfileComponent } from './pages/profile/profile.component';
import { HorariosComponent } from './componentes/horarios/horarios.component';
import { LoadingModule } from './componentes/loading/loading.module';

import { CalendarModule } from 'primeng/calendar';
import { HistoriaClinicaComponent } from './componentes/historia-clinica/historia-clinica.component';
import { UltimosTurnosComponent } from './componentes/ultimos-turnos/ultimos-turnos.component';
import { MisPacientesComponent } from './pages/mis-pacientes/mis-pacientes.component';
import { TablaPacientesComponent } from './componentes/tabla-pacientes/tabla-pacientes.component';
import { DistinctPacientPipe } from './pipes/distinct-pacient.pipe';
import { GraficosComponent } from './pages/graficos/graficos.component';
import {ChartModule} from 'primeng/chart';
import { TurnosPerFieldPipe } from './pipes/turnos-per-field.pipe';
import { TableLogUsersComponent } from './componentes/table-log-users/table-log-users.component';
import { AccentColorDirective } from './directives/accent-color.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MainComponent,
    HomeComponent,
    TablaUsuariosComponent,
    MasterUsuariosComponent,
    CrearUsuarioComponent,
    ProfileComponent,
    HorariosComponent,
    HistoriaClinicaComponent,
    UltimosTurnosComponent,
    MisPacientesComponent,
    TablaPacientesComponent,
    DistinctPacientPipe,
    GraficosComponent,
    TurnosPerFieldPipe,
    TableLogUsersComponent,
    AccentColorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DialogModule,
    MultiSelectModule,
    ToastModule,
    DropdownModule,
    LoadingModule,
    CalendarModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
