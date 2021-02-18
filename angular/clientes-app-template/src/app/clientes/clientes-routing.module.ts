import { LayoutComponent } from './../layout/layout.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';


const routes: Routes = [
  {path: 'clientes', component: LayoutComponent, children:[
    {path: 'forms', component: ClientesFormComponent},
    {path: 'forms/:id', component: ClientesFormComponent},
    {path: 'lista', component: ClientesListaComponent},
    {path: '', redirectTo: '/clientes/lista', pathMatch:'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
