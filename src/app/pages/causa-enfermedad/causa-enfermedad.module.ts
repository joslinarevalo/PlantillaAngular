import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CausaEnfermedadRoutingModule } from './causa-enfermedad-routing.module';
import { MostrarCausaComponent } from './pages/mostrarCausa/mostrarCausa.component';
import { TablaCausaComponent } from './pages/tablaCausa/tablaCausa.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { VerDetalleCComponent } from './pages/VerDetalleC/VerDetalleC.component';



@NgModule({
  declarations: [
    MostrarCausaComponent,
    TablaCausaComponent,
    NuevoComponent,
    VerDetalleCComponent
  
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgbModalModule ,
    DataTablesModule,
    CausaEnfermedadRoutingModule,
 
  ]
})
export class CausaEnfermedadModule { }
