import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaTratamientoComponent } from './pages/consulta-tratamiento/consulta-tratamiento.component';
import { CardsComponent } from './component/cards/cards.component';

const routes: Routes = [
  {
    path: "listaTratamiento",
    component: ConsultaTratamientoComponent,
  },
  {
    path: "detalle/:idTratamiento",
    component: CardsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaTratamientoRoutingModule { }
