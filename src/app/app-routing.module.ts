import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminActiveGuard } from './guard/admin-active.guard';
import { UserActiveGuard } from './guard/user-active.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { MasterUsuariosComponent } from './pages/master-usuarios/master-usuarios.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MisTurnosComponent } from './pages/turnos/mis-turnos/mis-turnos.component';
// import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { SolicitarComponent } from './pages/turnos/solicitar/solicitar.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'Login' , component: AuthComponent},
  {path: 'Usuarios' , component: MasterUsuariosComponent, canActivate:[AdminActiveGuard]},
  {path: 'MisTurnos' , component: MisTurnosComponent, canActivate:[UserActiveGuard]},
  {path: 'Turno' , component: SolicitarComponent, canActivate:[UserActiveGuard]},
  {path: 'Profile' , component: ProfileComponent, canActivate:[UserActiveGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
