import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ReporteComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    DataTablesModule
  ]
})
export class ReportesModule { }
