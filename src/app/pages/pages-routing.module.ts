import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DefaultComponent } from "./dashboards/default/default.component";
const routes: Routes = [
  { path: "", redirectTo: "dashboard" },
  { path: "dashboard", component: DefaultComponent },

  {
    path: "detallecausa",
    loadChildren: () =>
      import("./detalle-causa/detalle-causa.module").then(
        (m) => m.DetalleCausaModule
      ),
  },
  {
    path: "causaEnfermedad",
    loadChildren: () =>
      import("./causa-enfermedad/causa-enfermedad.module").then(
        (m) => m.CausaEnfermedadModule
      ),
  },
  {
    path: "tratamiento",
    loadChildren: () =>
      import("./tratamiento/tratamiento.module").then(
        (m) => m.TratamientoModule
      ),
  },
  {
    path: "detalleTratamiento",
    loadChildren: () =>
      import("./detalle-tratamiento/detalle-tratamiento.module").then(
        (m) => m.DetalleTratamientoModule
      ),
  },
  {
    path: "enfermedades",
    loadChildren: () =>
      import("./enfermedades/enfermedades.module").then(
        (m) => m.EnfermedadesModule
      ),
  },
  {
    path: "paginas-principal",
    loadChildren: () =>
      import("./paginas-principal/paginas-principal.module").then(
        (m) => m.PaginasPrincipalModule
      ),
  },
  {
    path: "patogenos",
    loadChildren: () =>
      import("./patogenos/patogenos.module").then(
        (m) => m.PatogenosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
