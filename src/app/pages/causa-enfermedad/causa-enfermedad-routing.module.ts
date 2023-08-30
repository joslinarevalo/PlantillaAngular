import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarCausaComponent } from './pages/mostrarCausa/mostrarCausa.component';

const routes: Routes = [
  {
    path: 'mostrar',
    component: MostrarCausaComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CausaEnfermedadRoutingModule { }
