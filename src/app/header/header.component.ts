import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  titulo:string = 'Clientes app';
  
  constructor(public authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  logout():void{
    let username = this.authService.usuario.username;

    this.authService.logout();

    swal('Logout',`${username}, has cerrado sesión con éxito`,'success');
    this.router.navigate(['/acceso']);
  }

}
