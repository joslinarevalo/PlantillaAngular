import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaTratamientoRoutingModule } from './consulta-tratamiento-routing.module';
import { ConsultaTratamientoComponent } from './pages/consulta-tratamiento/consulta-tratamiento.component';
import { CardsComponent } from './component/cards/cards.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConsultaTratamientoComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    ConsultaTratamientoRoutingModule,
    NgxPaginationModule, //PARA LA PAGINACION
    DataTablesModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class ConsultaTratamientoModule { }
