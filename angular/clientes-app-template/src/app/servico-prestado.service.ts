import { servicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBuscar';
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {
  apiURL:string = environment.apiURL + '/api/servico-prestado';

  constructor(private http: HttpClient) { }

  salvarServicoPrestado(servicoPrestado : ServicoPrestado): Observable<ServicoPrestado>{
      return this.http.post<ServicoPrestado>(`${this.apiURL}`, servicoPrestado)
  }


  consultarServicoPrestado(nome:string, mes:number):Observable<servicoPrestadoBusca[]>{
    return this.http.get<servicoPrestadoBusca[]>(`${this.apiURL}?nome=${nome}&mes=${mes}`);
  }
}
