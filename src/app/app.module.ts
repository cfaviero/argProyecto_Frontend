import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PorfolioComponent } from './porfolio/porfolio.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PorfolioService } from './servicios/porfolio.service';
import { interceptorProvider, ProdInterceptorService } from './servicios/interceptor.service';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { ToastrModule } from 'ngx-toastr';
import { ExperienciaComponent } from './cuerpo/experiencia/experiencia.component';
import { EducacionComponent } from './cuerpo/educacion/educacion.component';
import { ConocimientosComponent } from './cuerpo/conocimientos/conocimientos.component';
import { ProyectosComponent } from './cuerpo/proyectos/proyectos.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    CuerpoComponent,
    PorfolioComponent,
    LoginComponent,
    MenuComponent,
    IndexComponent,
    RegistroComponent,
    ExperienciaComponent,
    EducacionComponent,
    ConocimientosComponent,
    ProyectosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ToastrModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    PorfolioService,
    { provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true },
    interceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
