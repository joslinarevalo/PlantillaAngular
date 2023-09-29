import { Component, OnInit } from "@angular/core";
import { BusquedaService } from "../../service/Busqueda.service";
import { BuscarTramiento, ITratamientoMostrar } from "src/app/pages/tratamiento/interface/tratamiento.interface";
import { Router } from "@angular/router";
import { IBuscarPlanta } from "src/app/pages/planta/interface/iplanta";

@Component({
  selector: "app-pagInicioUser",
  templateUrl: "./pagInicioUser.component.html",
  styleUrls: ["./pagInicioUser.component.scss"],
})
export class PagInicioUserComponent implements OnInit {
  textoBusqueda: string = "";
  resultadosPlantas:IBuscarPlanta[] = [];
  resultadosTratamientosD:any[] = [];
  resultadosTrata:BuscarTramiento[] = [];
  resultadosCausas:any[] = [];
  constructor(private router: Router,private busquedaService: BusquedaService) {}

  ngOnInit() {
    this.resultadosPlantas = [];
    this.resultadosTratamientosD = [];
    this.resultadosTrata = [];
    this.resultadosCausas = [];
  }
buscar() {
  if (this.textoBusqueda.trim() !== "") {
   this.busquedaService.buscarPlanta(this.textoBusqueda).subscribe((data) => {
    this.resultadosPlantas = data;
  });
  this.busquedaService.buscarTratamiento(this.textoBusqueda).subscribe((data) => {
    this.resultadosTrata = data;
    console.log("estos son de tratmaiento",this.resultadosTrata);
  });
  this.busquedaService.buscarDetalleTratamiento(this.textoBusqueda).subscribe((data) => {
   this.resultadosTratamientosD = data;
   console.log(this.resultadosTratamientosD);
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
  
}
