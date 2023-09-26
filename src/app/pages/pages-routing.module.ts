import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DefaultComponent } from "./dashboards/default/default.component";
import { RolGuard } from "../usuario/guards/rol.guard";

const routes: Routes = [
  { path: "", redirectTo: "dashboard" },
  { path: "dashboard", component: DefaultComponent },
  {
    path: "dashboards",
    loadChildren: () =>
      import("./dashboards/dashboards.module").then((m) => m.DashboardsModule),
      canActivate: [ RolGuard], data:{rol:"ROLE_ADMIN"} 
  },
  {
    path: "icons",
    loadChildren: () =>
      import("./icons/icons.module").then((m) => m.IconsModule),
  },
  {
    path: "detallecausa",
    loadChildren: () =>
      import("./detalle-causa/detalle-causa.module").then(
        (m) => m.DetalleCausaModule
      ),
      canActivate: [ RolGuard], data:{rol:"ROLE_ADMIN"} 
  },
  {
    path: "causaEnfermedad",
    loadChildren: () =>
      import("./causa-enfermedad/causa-enfermedad.module").then(
        (m) => m.CausaEnfermedadModule
      ),
      canActivate: [ RolGuard], data:{rol:"ROLE_ADMIN"} 
  },
  {
    path: "tratamiento",
    loadChildren: () =>
      import("./tratamiento/tratamiento.module").then(
        (m) => m.TratamientoModule
      ),
      canActivate: [ RolGuard], data:{rol:"ROLE_ADMIN"} 
  },
  {
    path: "detalleTratamiento",
    loadChildren: () =>
      import("./detalle-tratamiento/detalle-tratamiento.module").then(
        (m) => m.DetalleTratamientoModule
      ),
      canActivate: [ RolGuard], data:{rol:"ROLE_ADMIN"} 
  },
  {
    path: "enfermedades",
    loadChildren: () =>
      import("./enfermedades/enfermedades.module").then(
        (m) => m.EnfermedadesModule
      ),
      canActivate: [ RolGuard], data:{rol:"ROLE_ADMIN"} 
  },
  {
    path: "reportes",
    loadChildren: () =>
      import("./reportes/reportes.module").then(
        (m) => m.ReportesModule
      ),
      canActivate: [ RolGuard], data:{rol:"ROLE_ADMIN"} 
  },
  {
    path: "tipoplanta",
    loadChildren: () =>
      import("./tipoplanta/tipoplanta.module").then(
        (m) => m.TipoplantaModule
      ),
  },
  {
    path: "familia",
    loadChildren: () =>
      import("./familia/familia.module").then(
        (m) => m.FamiliaModule
      ),
  },
  {
    path: "planta",
    loadChildren: () =>
      import("./planta/planta.module").then(
        (m) => m.PlantaModule
      ),
  },  
  
  /* INICIO Vistas permitidas para los alumnos */
  {
    path: "paginas-principal",
    loadChildren: () =>
      import("./paginas-principal/paginas-principal.module").then(
        (m) => m.PaginasPrincipalModule
      ),
  },
  {path: "consultaEnfermedades",
    loadChildren: () =>
      import("./consulta-enfermedad/consulta-enfermedad.module").then(
        (m) => m.ConsultaEnfermedadModule
      ),
  },
  {
    path: "patogenos",
    loadChildren: () =>
      import("./patogenos/patogenos.module").then(
        (m) => m.PatogenosModule
      ),
  },
  {path: "consultaPlantas",
    loadChildren: () =>
      import("./consulta-planta/consulta-planta.module").then(
        (m) => m.ConsultaPlantaModule
      ),
  },
  {
    path: "consultaTratamiento",
    loadChildren: () =>
      import("./consulta-tratamiento/consulta-tratamiento.module").then(
        (m) => m.ConsultaTratamientoModule
      ),
  },
/* FIN Vistas permitidas para los alumnos */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
