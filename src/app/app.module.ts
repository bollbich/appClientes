import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './rutas/app-routing.module';
import { AppComponent } from './app.component';
import { ClientesModule } from './clientes/clientes.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthService } from './usuarios/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientesModule,
    RouterModule,
    FooterModule,
    HeaderModule,
    UsuariosModule,
    HttpClientModule
  ],
  providers: [ClientesModule, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
