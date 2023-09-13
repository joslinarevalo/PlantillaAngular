import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PatogenosRoutingModule } from "./patogenos-routing.module";
import { MostrarComponent } from "./pages/mostrar/mostrar.component";
import { DetalleComponent } from "./pages/detalle/detalle.component";

@NgModule({
  declarations: [
    MostrarComponent,
    DetalleComponent
  ],
  imports: [CommonModule, PatogenosRoutingModule],
})
export class PatogenosModule {}
