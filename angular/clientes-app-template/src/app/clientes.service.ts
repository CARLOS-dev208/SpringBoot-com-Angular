import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Clientes } from './clientes/clientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http:HttpClient) { }

  salvar(cliente: Clientes) :Observable<Clientes>{
    return this.http.post<Clientes>('http://localhost:8080/api/clientes',cliente)
  }

  lista():Observable<Clientes[]>{
    return this.http.get<Clientes[]>('http://localhost:8080/api/clientes');
  }

  getClienteById(id: number):Observable<Clientes>{
    return this.http.get<any>(`http://localhost:8080/api/clientes/${id}`);
  }

  atualizarCliente(cliente: Clientes):Observable<any>{
    return this.http.put<Clientes>(`http://localhost:8080/api/clientes/${cliente.id}`,cliente);
  }

  deletaCliente(cliente: Clientes):Observable<any>{
   return this.http.delete<any>(`http://localhost:8080/api/clientes/${cliente.id}`);
  }

}
