import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../../pages/auth/auth.component';
import { LoginComponent } from '../../componentes/auth/login/login.component';
import { RegisterComponent } from '../../componentes/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CaptchaModule } from 'primeng/captcha';
import { LoadingModule } from 'src/app/componentes/loading/loading.module';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CaptchaModule,
    LoadingModule
  ]
})
export class AuthModule { }
