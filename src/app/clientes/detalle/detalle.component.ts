import { HttpEventType } from '@angular/common/http';
import { partitionArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {

  cliente!:Cliente;

  fotoSeleccionada!:File;

  progreso!:number;

  constructor(private clienteService:ClientesService, private activeRoute:ActivatedRoute) {

  }

  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe(
      params =>{
        let id:number = +params.get('id')!;

        if(id){
          this.clienteService.getCliente(id).subscribe(resp => this.cliente = resp);
        }
      }
    )
  }


  seleccionarImagen(event:any){
    this.fotoSeleccionada = event.target.File[0];
    console.log(this.fotoSeleccionada);
  }

  subirImagen():void{
    if(!this.fotoSeleccionada){
      swal('Error','Debe seleccionar una imagen','error');
    }
    else{
      this.clienteService.subirImagen(this.fotoSeleccionada,this.cliente.id).subscribe(event =>{

        if(event?.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total!)*100);
        }
        else if(event.type ==HttpEventType.Response){

          let response:any = event.body;
          this.cliente = response.cliente as Cliente;

          swal('La imagen a sdo subida');
        }
      });


    }
  }
}
