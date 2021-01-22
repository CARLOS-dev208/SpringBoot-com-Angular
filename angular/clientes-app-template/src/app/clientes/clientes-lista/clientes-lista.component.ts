import { ClientesService } from './../../clientes.service';
import { Clientes } from './../clientes';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {
  clientes: Clientes[] = [];
  clienteSelecionado: Clientes;
  mensagemSecesso: string;
  mensagemErro: string;
  constructor(private service: ClientesService) { }

  ngOnInit(): void {
    this.service.lista().subscribe(res => this.clientes = res);
  }

  preparaDelecao(cliente:Clientes){
    this.clienteSelecionado = cliente;
  }
  deletaCliente(){
    console.log( this.clienteSelecionado)
    this.service.deletaCliente(this.clienteSelecionado).subscribe(res =>{
      this.mensagemSecesso = 'Cliente foi deletado com sucesso'
      this.mensagemErro = null;
      this.ngOnInit();
    },erro=> {
      this.mensagemErro = 'Erro ao deleta Cliente';
      this.mensagemSecesso = null;
  });

    setTimeout(()=>{
      this.mensagemSecesso = null;
      this.mensagemErro = null;
    },3000);
  }
}



