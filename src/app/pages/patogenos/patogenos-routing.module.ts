import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MostrarComponent } from "./pages/mostrar/mostrar.component";
import { DetalleComponent } from "./pages/detalle/detalle.component";

const routes: Routes = [
  {
    path: "listpatogenos",
    component: MostrarComponent,
  },
  {
    path: "detalle/:idTipoCausa",
    component: DetalleComponent,
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatogenosRoutingModule {}
