import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnfermedadRoutingModule } from './enfermedad-routing.module';
import { TablaComponent } from './pages/tabla/tabla.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EnfermedadService } from './services/enfermedad.service';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    TablaComponent,
    NuevoComponent,
    MostrarComponent,
    BuscarComponent
  ],
  imports: [
    CommonModule,
    EnfermedadRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,//para las peticiones       
    //InfiniteScrollModule,//para scroll infinito
    UIModule,//para la modal
    FormsModule,//
    NgbModalModule,
    NgxPaginationModule,//PARA LA PAGINACION
    Ng2SearchPipeModule,//PIPE PARA FILTRAR
    DataTablesModule,
    
],
providers:[
  EnfermedadService
]
})
export class EnfermedadModule { }
