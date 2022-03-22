import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public usuario:Usuario = new Usuario();

  constructor(private authService:AuthService, private router:Router) {

  }

  ngOnInit(): void {
  }

  Acceder(){

    if(this.usuario.username==null|| this.usuario.password==null){
      swal('error Login','Username o password incorrecto!','error');
      return;
    }
    console.log(this.usuario);
    this.authService.login(this.usuario).subscribe(
      response =>{
       console.log(response);
       this.authService.guardarUsuario(response.access_token);
       this.authService.guardarToken(response.access_token);
       let usuario = this.authService.usuario;

       this.router.navigate(['/clientes']);

       swal('Login',`Hola ${usuario.username}, ha iniciado sesion con éxito`,'success');

      },
      err=>{
            if(err.status == 400){
              swal('error Login','Username o password incorrecto!','error');

            }
            else if(err.status == 401){
              swal('error Login','Username o password incorrecto!','error');

            }
        });
  }
}
