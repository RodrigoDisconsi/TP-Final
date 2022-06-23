import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminActiveGuard } from './guard/admin-active.guard';
import { UserActiveGuard } from './guard/user-active.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { GraficosComponent } from './pages/graficos/graficos.component';
import { HomeComponent } from './pages/home/home.component';
import { MasterUsuariosComponent } from './pages/master-usuarios/master-usuarios.component';
import { MisPacientesComponent } from './pages/mis-pacientes/mis-pacientes.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MisTurnosComponent } from './pages/turnos/mis-turnos/mis-turnos.component';
// import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { SolicitarComponent } from './pages/turnos/solicitar/solicitar.component';

const routes: Routes = [
  {path: '' , component: HomeComponent, data: {animation: 'homePage'}},
  {path: 'Login' , component: AuthComponent, loadChildren: () => import('../app/pages/auth/auth.module').then(m => m.AuthModule), data: {animation: 'fadePage'}},
  {path: 'Usuarios' , component: MasterUsuariosComponent, canActivate:[AdminActiveGuard]},
  {path: 'Estadisticas' , component: GraficosComponent, canActivate:[AdminActiveGuard]},
  {path: 'Pacientes' , component: MisPacientesComponent, canActivate:[UserActiveGuard]},
  {path: 'MisTurnos' , component: MisTurnosComponent, canActivate:[UserActiveGuard], loadChildren: () => import('../app/pages/turnos/turnos.module').then(m => m.TurnosModule)},
  {path: 'Turno' , component: SolicitarComponent, canActivate:[UserActiveGuard], loadChildren: () => import('../app/pages/turnos/turnos.module').then(m => m.TurnosModule)},
  {path: 'Profile' , component: ProfileComponent, canActivate:[UserActiveGuard], data: {animation: 'homePage'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
