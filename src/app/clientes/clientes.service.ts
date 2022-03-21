import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ClientesService {

urlEndPoint:string = "http://localhost:8087/api/todos";

  constructor(private http:HttpClient) { }

  // getClientes():Observable<Cliente[]>{
  //   return of(CLIENTES);
  // }

  getClientes():Observable<Cliente[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map((Response)=> Response as Cliente[])
    );
  }


}
