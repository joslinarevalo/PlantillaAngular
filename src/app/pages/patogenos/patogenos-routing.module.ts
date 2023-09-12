import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MostrarComponent } from "./pages/mostrar/mostrar.component";

const routes: Routes = [
  {
    path: "listpatogenos",
    component: MostrarComponent,
  },
  {
    path: "patogenos/detalle/:idTipoCausa",
    component: MostrarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatogenosRoutingModule {}
