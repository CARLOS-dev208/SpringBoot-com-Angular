import { ServicoPrestado } from './../servicoPrestado';
import { Component, OnInit } from '@angular/core';
import { Clientes } from './../../clientes/clientes';
import { ClientesService } from './../../clientes.service';
import {ServicoPrestadoService}  from '../../servico-prestado.service'

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {
  clientes: Clientes[] = []
  servico: ServicoPrestado
  seccess: boolean
  erros : String[]



  constructor(private clienteServicos: ClientesService,
    private servicoPrestadoService:ServicoPrestadoService) {
    this.servico = new ServicoPrestado();
   }

  ngOnInit(): void {
    this.clienteServicos.lista().subscribe(response => {
      this.clientes = response
    },erro =>{
      console.log(erro)
    })
  }

  onSubmit(){
    this.servicoPrestadoService.salvarServicoPrestado(this.servico).subscribe(res=>{
        this.seccess = true
        this.erros = []
        setTimeout(()=>{
          this.seccess = false;
        },3000)
    }, erro =>{
      this.erros = erro.error.campos
      this.seccess = false;
      setTimeout(()=>{
        this.erros =[]
      },39000)
    })

}

}
