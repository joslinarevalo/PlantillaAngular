import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultaTratamientoRoutingModule } from './consulta-tratamiento-routing.module';
import { ConsultaTratamientoComponent } from './pages/consulta-tratamiento/consulta-tratamiento.component';
import { CardsComponent } from './component/cards/cards.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ConsultaTratamientoComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    ConsultaTratamientoRoutingModule,
    NgxPaginationModule, //PARA LA PAGINACION
    DataTablesModule
  ]
})
export class ConsultaTratamientoModule { }
