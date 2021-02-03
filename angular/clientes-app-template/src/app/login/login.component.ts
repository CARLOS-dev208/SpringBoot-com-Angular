import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username:string;
  password:string;
  isLoginErro:boolean
  isCadastrando:boolean

  constructor() {  }

  onSubmit(){
    console.log(`User: ${this.username}, Pass: ${this.password}`)
  }

  preparaCadastrando(){
    this.isCadastrando = true
  }


}