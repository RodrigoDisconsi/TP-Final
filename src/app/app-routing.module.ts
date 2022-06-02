import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';
import { MasterUsuariosComponent } from './pages/master-usuarios/master-usuarios.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'Login' , component: AuthComponent},
  {path: 'Usuarios' , component: MasterUsuariosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
