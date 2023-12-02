import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleCausaComponent } from './pages/detalle-causa/detalle-causa.component';



const routes: Routes = [
  {path:'detalleCausa',component:DetalleCausaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleDeCausaRoutingModule { }
