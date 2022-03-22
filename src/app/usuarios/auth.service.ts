import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuarios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario!:Usuario;
  private _token!:string;

  constructor(private http:HttpClient) { }

  public get usuario():Usuario{

    if(this._usuario!=null)
    {
      return this._usuario;
    }
    else if(this._usuario==null && sessionStorage.getItem('usuario')!=null){

      this._usuario = JSON.parse(sessionStorage.getItem('usuario')||'{}')as Usuario;
    }

    return new Usuario;
  }

  public get token():string{

    if(this._token!=null){
      return this._token
    }
    else if(this._token== null &&sessionStorage.getItem('token')!= null){

      this._token = sessionStorage.getItem('token')|| '{}';

      return this._token;
    }

    return "";
  }

  login(usuario:Usuario):Observable<any>{

    const urlEndPoint:string = "http://localhost:8087/oauth/token";

    const credenciales = btoa('angularapp'+ ':' + '12345');

    const httpHEaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization': 'Basic '+credenciales    });

      let params = new URLSearchParams();
      params.set('grant_type','password');
      params.set('username',usuario.username);
      params.set('password',usuario.password);

      console.log(params.toString());

      return this.http.post<any>(urlEndPoint, params.toString(), {headers:httpHEaders});
  }
  public set usuario(usuario:Usuario)
  {
    this._usuario = usuario;
  }

  guardarUsuario(accesToken:string):void
  {
    let payload = this.obtenerDatosToken(accesToken);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.Authorization;
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));
  }

  guardarToken(accesToken:string):void
  {
    this._token = accesToken;
    sessionStorage.setItem('token', accesToken);
  }

  obtenerDatosToken(accesToken:string):any
  {
    if(accesToken!=null){
      return JSON.parse(atob(accesToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated():boolean{

    let payload = this.obtenerDatosToken(this._token);

    if(payload!=null && payload.user_name && payload.user_name.length>0){
      return true;
    }

    return false;
  }

  logout():void
  {
    this._token = '';
    this._usuario = new Usuario();
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuaruio');
  }
}
