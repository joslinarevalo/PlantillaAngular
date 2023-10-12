import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { AcercadeComponent } from './Acercade/Acercade.component';


const routes: Routes = [
    {
        path: 'default',
        component: DefaultComponent
    },
    {
        path: 'acercade',
        component: AcercadeComponent  // Usa el componente Acercade para la ruta /acercade
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {}
