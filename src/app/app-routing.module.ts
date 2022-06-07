import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarTurnoComponent } from './componentes/turnos/solicitar-turno/solicitar-turno.component';
import { AdminActiveGuard } from './guard/admin-active.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { MasterUsuariosComponent } from './pages/master-usuarios/master-usuarios.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'Login' , component: AuthComponent},
  {path: 'Usuarios' , component: MasterUsuariosComponent, canActivate:[AdminActiveGuard]},
  {path: 'Turno' , component: SolicitarTurnoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
