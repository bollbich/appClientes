import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../rutas/app-routing.module';
import { DetalleComponent } from './detalle/detalle.component';
import { LoginComponent } from '../usuarios/login/login.component';



@NgModule({
  declarations: [
    ClientesComponent,
    FormComponent,
    DetalleComponent
  ],
  exports:[
    ClientesComponent,
    FormComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ]
})
export class ClientesModule { }
