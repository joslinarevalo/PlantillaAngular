import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Color, Label, MultiDataSet } from "ng2-charts";
import { PlantaService } from "../../planta/service/planta.service";
import { EnfermedadService } from "../../enfermedades/service/enfermedad.service";
import { GraficoService } from "../services/grafico.service";
import { ChartOptions } from "../chartType.interface";
import { IGrafico } from "./grafico";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  totalPlantas: number;
  totalEnfermedades: number;
  totalUsuarios: number;
  totalTratamientos: number;
  constructor(
    private plantService: PlantaService,
    private enfermeda: EnfermedadService,
    private graficoService: GraficoService
  ) {}
  ngOnInit() {
    this.obtenerConteoPlantas();
    this.obtenerConteoEnfermedad();
  }
  obtenerConteoPlantas() {
    this.plantService.obtenerConteoPlantas().subscribe(
      (conteo) => {
        this.totalPlantas = conteo;
        console.log("conteo de plantas: ", this.totalPlantas);
      },
      (error) => {
        console.error("Error al obtener el conteo de plantas: ", error);
      }
    );
  }
  obtenerConteoEnfermedad() {
    this.enfermeda.obtenerConteoenfermedad().subscribe(
      (conteo) => {
        this.totalEnfermedades = conteo;
        console.log("conteo de enfermedad: ", this.totalPlantas);
      },
      (error) => {
        console.error("Error al obtener el conteo de enfermedad: ", error);
      }
    );
  }
 
  
 
  
}
