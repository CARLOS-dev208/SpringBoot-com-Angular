import { Observable } from 'rxjs';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { ClientesService } from './../../clientes.service';
import { Component, OnInit } from '@angular/core';
import {Clientes} from '../clientes'


@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {
  clientes: Clientes;
  seccess: boolean = false;
  erros: String[];
  validacaoCpf: string
  id: number;

  constructor(private service: ClientesService, private router: Router,
    private parametro: ActivatedRoute) {
    this.clientes = new Clientes();
  }

  ngOnInit(): void {
    let param : Observable<Params> = this.parametro.params
   param.subscribe(urlParams =>{
     this.id = urlParams['id'];
     if(this.id){
       this.service.getClienteById(this.id).subscribe(res => {
         this.clientes = res;
       },erroResponse =>{
         this.clientes = new Clientes();
       });

     }
   })

  }

  onSubmit(){
    if(this.id){
        this.service.atualizarCliente(this.clientes)
        .subscribe(res=>{
          this.erros = []
          this.seccess= true;
        },error=> {
          console.log(error)
          this.erros = error.error.campos;
        });
        setTimeout(()=>{
          this.seccess=false;
          this.erros= [];
        },4000);
    }else{
      this.service.salvar(this.clientes).subscribe(resposta =>{
        this.erros = []
        this.seccess= true;
        this.clientes = resposta;
      },errorResponse=>{
        this.seccess= false;
        this.erros = errorResponse.error.campos;
        this.validacaoCpf = errorResponse.error.mensagem
      } );
      setTimeout(()=>{
        this.seccess=false;
        this.validacaoCpf = null;
        this.erros= [];
        // this.router.navigate(['/clientes-lista']);
      },4000);
    }
  }

  volta(){
    this.router.navigate(['/clientes-lista']);
  }
}
