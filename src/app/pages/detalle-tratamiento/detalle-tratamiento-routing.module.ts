import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleTratamientoComponent } from './pages/detalle-tratamiento/detalle-tratamiento.component';

const routes: Routes = [
  {path:'detalleTratamiento',component:DetalleTratamientoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleTratamientoRoutingModule { }
