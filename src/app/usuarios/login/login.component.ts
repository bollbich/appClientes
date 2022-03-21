import { Component, OnInit } from '@angular/core';
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

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  Acceder(){
    console.log(this.usuario);
    this.authService.login(this.usuario).subscribe(
      response =>{
       console.log(response);
      },
      err=>{
          console.log(err);
        });
  }

}
