import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Color, Label, MultiDataSet } from "ng2-charts";
import { PlantaService } from "../../planta/service/planta.service";
import { EnfermedadService } from "../../enfermedades/service/enfermedad.service";
import { GraficoService } from "../services/grafico.service";
import { ChartOptions } from "../chartType.interface";
import { IGrafico } from "./grafico";
import { AutenticacionService } from "src/app/usuario/services/autenticacion.service";
import { TratamientoService } from "../../tratamiento/service/service.service";
import { UsuarioServiceService } from "../../usuario-c/service/usuario-service.service";

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
    private enfermeda: EnfermedadService,private serviceTratamiento:TratamientoService,private usuarioService:UsuarioServiceService
    ,private graficoService: GraficoService,public autenticacion:AutenticacionService
  ) {}
  ngOnInit() {
    this.obtenerConteoPlantas();
    this.obtenerConteoEnfermedad();
    this.obtenerConteoTratamiento();
    this.obtenerConteoUser();
  }
  obtenerConteoPlantas() {
    this.plantService.obtenerConteoPlantas().subscribe(
      (conteo) => {
        this.totalPlantas = conteo;
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
      },
      (error) => {
        console.error("Error al obtener el conteo de enfermedad: ", error);
      }
    );
  }
  obtenerConteoTratamiento() {
    this.serviceTratamiento.obtenerConteTramiento().subscribe(
      (conteo) => {
        this.totalTratamientos = conteo;
      },
      (error) => {
        console.error("Error al obtener el conteo de tratamiento: ", error);
      }
    );
  }
  obtenerConteoUser() {
    this.usuarioService.obtenerConteUser().subscribe(
      (conteo) => {
        this.totalUsuarios = conteo;
      },
      (error) => {
        console.error("Error al obtener el conteo de usuarios: ", error);
      }
    );
  }


}
