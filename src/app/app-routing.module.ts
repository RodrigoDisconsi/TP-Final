import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRegisterComponent } from './componentes/login-register/login-register.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  // {path: '' , component: HomeComponent},
  {path: '' , component: LoginRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
