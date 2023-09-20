import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarComponent } from './mostrar/mostrar.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [
  {
    path: "listaPlantas",
    component: MostrarComponent,
  },
  {
    path: "detalle/:idPlanta",
    component: DetalleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaPlantaRoutingModule { }
