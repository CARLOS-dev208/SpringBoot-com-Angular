import { servicoPrestadoBusca } from './servicoPrestadoBuscar';
import { ServicoPrestadoService } from './../../servico-prestado.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {
  nome: string;
  mes: number;
  meses: number[];
  lista: servicoPrestadoBusca[]
  menssagem:string

  constructor(private service: ServicoPrestadoService) {
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12];
   }

  ngOnInit(): void {
  }

  consultar(){
    this.service.consultarServicoPrestado(this.nome, this.mes).subscribe(res=>{
      this.lista = res
      this.lista.length <=0 ? this.menssagem = "Nem um serviço cadastrado!" : this.menssagem = null
    },erro=>{
      this.menssagem= "Campo vazio!"
    });
  }

}
