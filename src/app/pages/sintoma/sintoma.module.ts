import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SintomaRoutingModule } from './sintoma-routing.module';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { TablaComponent } from './pages/tabla/tabla.component';
import { UIModule } from "../../shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SintomaService } from './services/sintoma.service';


@NgModule({
    declarations: [
        BuscarComponent,
        MostrarComponent,
        NuevoComponent,
        TablaComponent
    ],
    imports: [
        CommonModule,
        SintomaRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,//para las peticiones       
        //InfiniteScrollModule,//para scroll infinito
        UIModule,//para la modal
        FormsModule,//
        NgbModalModule,
        NgxPaginationModule,//PARA LA PAGINACION
        Ng2SearchPipeModule//PIPE PARA FILTRAR
    ],
    providers:[
        SintomaService
    ]
})
export class SintomaModule { }
