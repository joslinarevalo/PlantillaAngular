import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TratamientoRoutingModule } from './tratamiento-routing.module';
import { TablaComponent } from './component/tabla/tabla.component';
import { FormularioComponent } from './component/formulario/formulario.component';
import { TratamientoComponent } from './pages/tratamiento/tratamiento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    TablaComponent,
    FormularioComponent,
    TratamientoComponent
  ],
  imports: [
    CommonModule,
    TratamientoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule, //PARA LA PAGINACION
    Ng2SearchPipeModule
    
   
  ]
})
export class TratamientoModule { }
