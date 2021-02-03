import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Clientes } from './clientes/clientes';
import { Observable } from 'rxjs';
import {environment} from  '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  apiURL: string = environment.apiURL + '/api/clientes';

  constructor(private http:HttpClient) { }

  salvar(cliente: Clientes) :Observable<Clientes>{
    return this.http.post<Clientes>(`${this.apiURL}` ,cliente)
  }

  lista():Observable<Clientes[]>{
    return this.http.get<Clientes[]>(`${this.apiURL}`);
  }

  getClienteById(id: number):Observable<Clientes>{
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  atualizarCliente(cliente: Clientes):Observable<any>{
    return this.http.put<Clientes>(`${this.apiURL}/${cliente.id}`,cliente);
  }

  deletaCliente(cliente: Clientes):Observable<any>{
   return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
  }

}
