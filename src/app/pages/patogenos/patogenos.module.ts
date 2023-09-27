import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PatogenosRoutingModule } from "./patogenos-routing.module";
import { MostrarComponent } from "./pages/mostrar/mostrar.component";
import { DetalleComponent } from "./pages/detalle/detalle.component";
import { FormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    MostrarComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule, 
    PatogenosRoutingModule,
    FormsModule,
    NgxPaginationModule,
    InfiniteScrollModule],
})
export class PatogenosModule {}
