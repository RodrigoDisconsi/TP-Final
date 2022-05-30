import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { MainComponent } from './pages/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegisterComponent } from './componentes/login-register/login-register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MainComponent,
    HomeComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
