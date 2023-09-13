import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoplantaRoutingModule } from './tipoplanta-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormularioComponent } from './component/formulario/formulario.component';
import { TablaComponent } from './component/tabla/tabla.component';
import { TipoplantaComponent } from './pages/tipoplanta/tipoplanta.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [


    FormularioComponent,
         TablaComponent,
         TipoplantaComponent
  ],
  imports: [
    CommonModule,
    TipoplantaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule, //PARA LA PAGINACION
    Ng2SearchPipeModule, //PIPE PARA FILTRAR
    DataTablesModule

  ]
})
export class TipoplantaModule { }
