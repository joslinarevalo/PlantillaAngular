import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TratamientoComponent } from './pages/tratamiento/tratamiento.component';

const routes: Routes = [
  {path:'tratamiento',component:TratamientoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TratamientoRoutingModule { }
