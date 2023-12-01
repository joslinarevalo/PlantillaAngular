import { Component, Input, OnInit } from "@angular/core";
import { BusquedaService } from "../../service/Busqueda.service";
import { BuscarTramiento, ITratamientoMostrar } from "src/app/pages/tratamiento/interface/tratamiento.interface";
import { Router } from "@angular/router";
import { IBuscarPlanta } from "src/app/pages/planta/interface/iplanta";
import { DetallecausaService } from "src/app/pages/detalle-causa/services/detallecausa.service";
import { IDetalleTratamiento } from "src/app/pages/detalle-tratamiento/interface/detalleTratamiento.interface";


@Component({
  selector: "app-pagInicioUser",
  templateUrl: "./pagInicioUser.component.html",
  styleUrls: ["./pagInicioUser.component.scss"],
})
export class PagInicioUserComponent implements OnInit {
  textoBusqueda: string = "";
  resultadosPlantas:IBuscarPlanta[] = [];
  resultadosTratamientosD:IDetalleTratamiento[] = [];
  resultadosTrata:BuscarTramiento[] = [];
  resultadosCausas:any[] = [];
  detallePlantaPreview: any[] = [];

  constructor(private router: Router,private busquedaService: BusquedaService,private serviceDetalleCausa:DetallecausaService) {}

  ngOnInit() {
    this.resultadosPlantas = [];
    this.resultadosTratamientosD = [];
    this.resultadosTrata = [];
    this.resultadosCausas = [];
    this.detallePlantaPreview;
;
  }
buscar() {
  if (this.textoBusqueda.trim() !== "") {
   this.busquedaService.buscarPlanta(this.textoBusqueda).subscribe((data) => {
    this.resultadosPlantas = data;
    if (this.resultadosPlantas.length > 0) {
      this.verDetalles(this.resultadosPlantas[0]);
    }
  });
  this.busquedaService.buscarTratamiento(this.textoBusqueda).subscribe((data) => {
    this.resultadosTrata = data;
  });
  this.busquedaService.buscarDetalleTratamiento(this.textoBusqueda).subscribe((data) => {
   this.resultadosTratamientosD = data;
  });

  this.busquedaService.buscarDetalleCausa(this.textoBusqueda).subscribe((data) => {
    this.resultadosCausas = data;
  });
  } else {
    this.resultadosPlantas = [];
  //  this.resultadosTratamientos = [];
    this.resultadosTrata = [];
    this.resultadosCausas = [];
  }

}

verDetalle(idTratamiento: string) {
  // Navega a la ruta del componente de detalle, pasando el ID como parámetro
  console.error('ID de tratamiento indefinido o faltante.',idTratamiento);
  this.router.navigate(['consultaTratamiento/detalle', idTratamiento]);

}

verDetalles(planta: IBuscarPlanta) {
  // Obtén los detalles de la planta seleccionada
  this.serviceDetalleCausa.obtenerDetallesCausaPorPlanta(planta.idPlanta).subscribe(
    (data) => {
      // Almacena la vista previa de los detalles de causa en detallePlantaPreview
      this.detallePlantaPreview = data;
    },
    (error) => {
      console.error("Error al obtener detalles de causa:", error);
    }
  );
}




}
