import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnfermedadComponent } from './pages/enfermedad/enfermedad.component';

const routes: Routes = [
  {path:"enfermedades",component:EnfermedadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnfermedadesRoutingModule { }
