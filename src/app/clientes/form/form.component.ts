import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  titulo:string = 'Nuevo Cliente';
  cliente:Cliente = new Cliente();

  constructor(private clienteService:ClientesService, private router:Router) { }

  ngOnInit(): void {


  }

  create():void{
    console.log('Formaulario enviado');
    console.log(this.cliente)

    this.clienteService.create(this.cliente).subscribe(
      resp =>{
        swal('Nuevo cliente',`${this.cliente.nombre} creado con exito`);
        this.router.navigate(['/clientes']);
      },
      err=>{
        console.log('Codigo de error'+err.status);
      }
    )
  }
}
