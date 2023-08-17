import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarComponent } from '../sintoma/pages/mostrar/mostrar.component';
import { ListarComponent } from './pages/listar/listar.component';

const routes: Routes = [
  {
    path: 'mostrar',
    component: ListarComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleCausaRoutingModule { }
