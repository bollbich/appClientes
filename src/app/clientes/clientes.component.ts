import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  clientes!:Cliente[];

  constructor(private servicio:ClientesService) {
   }

  ngOnInit(): void {
    this.servicio.getClientes().subscribe(
      resp => this.clientes = resp);
  }

  delete():void{
    window.confirm("¿Desea eliminar el registro?");
  }
}
