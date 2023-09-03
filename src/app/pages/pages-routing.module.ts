import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'sintomas', loadChildren: () => import('./sintoma/sintoma.module').then(m => m.SintomaModule) },
  { path: 'tratamiento', loadChildren: () => import('./tratamiento/tratamiento.module').then(m => m.TratamientoModule) },
  { path: 'detalleTratamiento', loadChildren: () => import('./detalle-tratamiento/detalle-tratamiento.module').then(m => m.DetalleTratamientoModule) },
  { path: 'detallecausa', loadChildren: () => import('./detalle-causa/detalle-causa.module').then(m => m.DetalleCausaModule) },
  { path: 'causaEnfermedad', loadChildren: () => import('./causa-enfermedad/causa-enfermedad.module').then(m => m.CausaEnfermedadModule) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
