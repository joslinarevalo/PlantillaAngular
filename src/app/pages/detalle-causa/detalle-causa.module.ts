import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleCausaRoutingModule } from './detalle-causa-routing.module';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ListarComponent } from './pages/listar/listar.component';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { TablaComponent } from './pages/tabla/tabla.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    BuscarComponent,
    ListarComponent,
    TablaComponent,
    NuevoComponent
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgbModalModule ,// para el modal 
    DetalleCausaRoutingModule,
    DataTablesModule,
    NgSelectModule,
  ]
})
export class DetalleCausaModule { }
