import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaEnfermedadRoutingModule } from './consulta-enfermedad-routing.module';
import { DetalleComponent } from './detalle/detalle.component';
import { MostrarComponent } from './mostrar/mostrar.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { InfiniteScrollModule } from "ngx-infinite-scroll";


@NgModule({
  declarations: [
    DetalleComponent,
    MostrarComponent
  ],
  imports: [
    CommonModule,
    ConsultaEnfermedadRoutingModule,
    FormsModule,
    InfiniteScrollModule,
    NgxPaginationModule //PARA LA PAGINACION
  ]
})
export class ConsultaEnfermedadModule { }
