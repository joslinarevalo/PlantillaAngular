import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoplantaRoutingModule } from './tipoplanta-routing.module';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { TablaComponent } from './pages/tabla/tabla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    BuscarComponent,
    MostrarComponent,
    NuevoComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    TipoplantaRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,//para las peticiones
    //InfiniteScrollModule,//para scroll infinito
    UIModule,//para la modal
    FormsModule,//
    NgbModalModule,
    NgxPaginationModule,//PARA LA PAGINACION
    Ng2SearchPipeModule//PIPE PARA FILTRAR

  ]
})
export class TipoplantaModule { }
