import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { PlantaService } from '../../planta/service/planta.service';
import { EnfermedadService } from '../../enfermedades/service/enfermedad.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  totalPlantas: number;
  totalEnfermedades: number;
  totalUsuarios: number;
  totalTratamientos : number;
  constructor(private plantService: PlantaService, private enfermeda:EnfermedadService) {
  }
  ngOnInit() {
    this.obtenerConteoPlantas();
    this.obtenerConteoEnfermedad();

  }
  obtenerConteoPlantas() {
    this.plantService.obtenerConteoPlantas().subscribe(
      (conteo) => {
        this.totalPlantas = conteo;
        console.log('conteo de plantas: ', this.totalPlantas);
      },
      (error) => {
        console.error('Error al obtener el conteo de plantas: ', error);
      }
    );

  }
  obtenerConteoEnfermedad() {
    this.enfermeda.obtenerConteoenfermedad().subscribe(
      (conteo) => {
        this.totalEnfermedades = conteo;
        console.log('conteo de enfermedad: ', this.totalPlantas);
      },
      (error) => {
        console.error('Error al obtener el conteo de enfermedad: ', error);
      }
    );

  }
  
}
