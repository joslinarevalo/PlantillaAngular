import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarComponent } from './mostrar/mostrar.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [
  {
    path: "listaEnfermedades",
    component: MostrarComponent,
  },
  {
    path: "detalle/:idEnfermedad",
    component: DetalleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaEnfermedadRoutingModule { }
