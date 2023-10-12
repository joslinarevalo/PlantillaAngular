import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbTooltipModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular';

import { DefaultComponent } from './default/default.component';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { GraficoComponent } from './grafico/grafico.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { AcercadeComponent } from './Acercade/Acercade.component';

@NgModule({
  declarations: [DefaultComponent,GraficoComponent,AcercadeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
    UIModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    WidgetModule,
    SimplebarAngularModule,
    ChartsModule,
    HttpClientModule,
    NgApexchartsModule ,// para graficos 
    ChartsModule ,//graficas 
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],

})
export class DashboardsModule { }
