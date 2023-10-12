import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaPlantaRoutingModule } from './consulta-planta-routing.module';
import { DetalleComponent } from './detalle/detalle.component';
import { MostrarComponent } from './mostrar/mostrar.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DetalleComponent,
    MostrarComponent,

  ],
  imports: [
    CommonModule,
    ConsultaPlantaRoutingModule,
    FormsModule,
    InfiniteScrollModule,
    NgxPaginationModule
  ]
})
export class ConsultaPlantaModule { }
