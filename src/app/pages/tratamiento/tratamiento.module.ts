import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TratamientoRoutingModule } from "./tratamiento-routing.module";
import { TratamientoComponent } from "./pages/tratamiento/tratamiento.component";
import { TablaComponent } from "./component/tabla/tabla.component";
import { FormularioComponent } from "./component/formulario/formulario.component";
import { NgxPaginationModule } from "ngx-pagination";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [TratamientoComponent, TablaComponent, FormularioComponent],
  imports: [
    CommonModule,
    TratamientoRoutingModule,
    NgxPaginationModule, //PARA LA PAGINACION
    Ng2SearchPipeModule, //PIPE PARA FILTRAR
    ReactiveFormsModule
  ],
})
export class TratamientoModule {}
