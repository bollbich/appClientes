import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  imagenSrc!:string;
  clientes!:Cliente[];

  constructor(private servicio:ClientesService, public authService:AuthService) {
   }

  ngOnInit(): void {

    this.imagenSrc = 'assets/userDefault.png';
    this.servicio.getClientes().subscribe(
      resp => this.clientes = resp);
  }

  delete(cliente:Cliente):void{
    swal({
      title:'¿Estas seguro?',
      text:`Seguro que quieres eliminar el cliente${cliente.nombre} ${cliente.apellido}`,
      type:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Si, eliminar!!',
      cancelButtonText:'No, cancelar!!',
      confirmButtonClass:'btn btn-success',
      cancelButtonClass:'btn btn-danger',
      buttonsStyling:false,
      reverseButtons:true
    }).then((result)=>{
      if(result.value){
        this.servicio.deleteCliente(cliente.id).subscribe(
          resp=>{
            this.clientes = this.clientes.filter(cli => cli != cliente);
            swal('Cliente eliminado', `Cliente ${cliente.nombre} eliminado con exito`,'success');
          }
        )
      }
    });
  }
}
