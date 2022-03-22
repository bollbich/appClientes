import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';
import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ClientesService {

  urlEndPoint:string = "http://localhost:8087/api/clientes";

  urlEndPointPostGuardar:string = "http://localhost:8087/api/cliente/guardarCliente";

  urlEndPointGetBuscar:string = "http://localhost:8087/api/cliente/buscarCliente";

  urlEndPointGetUpdate:string = "http://localhost:8087/api/cliente/updateCliente";


  urlEndPointDelete:string = "http://localhost:8087/api/cliente/deleteCliente";

  urlEndPointUpload:string = "http://localhost:8087/api/cliente/uploadImagen";


  constructor(private http:HttpClient, private authService:AuthService) { }

  httpHeaders = new HttpHeaders({'Content-Type':'aplication/json'});

  agregarAuthorizationHeader():any{
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }

    return this.httpHeaders;
  }

  getClientes():Observable<Cliente[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((Response)=> Response as Cliente[])
    );
  }

  //metodo post para agregar cliente
  create(cliente:Cliente):Observable<Cliente>{

    return this.http.post<Cliente>(this.urlEndPointPostGuardar,cliente,{headers:this.agregarAuthorizationHeader()});
  }

  //Buscar cliente por id
  getCliente(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPointGetBuscar}/${id}`,{headers:this.agregarAuthorizationHeader()});
  }

  //Actualizar cliente
  updateCliente(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPointGetUpdate}/${cliente.id}`,cliente,{headers:this.agregarAuthorizationHeader()});
  }

  //Borrar cliente por id
  deleteCliente(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPointDelete}/${id}`,{headers:this.agregarAuthorizationHeader()});
  }



  subirImagen(archivo:File, id:any):Observable<HttpEvent<any>>{

    let formData = new FormData();

    formData.append("archivo",archivo);
    formData.append("id",id);

    let httpHeaders = new HttpHeaders();

    let token = this.authService.token;

    if(token!=null){
      httpHeaders = httpHeaders.append('Authorization','Bearer'+token);
    }

    const req = new HttpRequest('POST',`${this.urlEndPointUpload}/`,formData,{
      headers:httpHeaders
    });

    return this.http.request(req).pipe(resp=>resp);

  }

}
