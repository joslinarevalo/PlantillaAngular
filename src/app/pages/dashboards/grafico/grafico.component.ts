import { Component, OnInit } from "@angular/core";
import { GraficoService } from "../services/grafico.service";
import { EChartsOption } from "echarts";
import { ChartType } from "ng-apexcharts";
import { Color } from "ng2-charts";

@Component({
  selector: "app-grafico",
  templateUrl: "./grafico.component.html",
  styleUrls: ["./grafico.component.scss"],
})
export class GraficoComponent implements OnInit {
  barChartOptions: EChartsOption;
  dynamicColors: string[] = [];

  constructor(private graficoService: GraficoService) {}

  ngOnInit(): void {
    this.graficoService.obtenerDatosParaGrafico().subscribe((data) => {
      const tiposCausa = data.map((item) => item.tipoCausa);
      const cantidadEnfermedades = data.map(
        (item) => item.cantidadEnfermedades
      );

      // Genera colores dinámicos para cada barra
      this.dynamicColors = this.generateRandomColors(tiposCausa.length);

      const barChartSeriesData = cantidadEnfermedades.map((value, index) => ({
        value: value,
        itemStyle: {
          color: this.dynamicColors[index], // Asigna colores dinámicos
        },
      }));

      this.barChartOptions = {
        title: {
          text: "CANTIDAD DE ENFERMEDADES POR TIPO DE CAUSA",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: tiposCausa,
          axisLabel: {
            interval: 0, // Muestra todas las etiquetas
            rotate: 0,   // Rotación de etiquetas en grados (0 para horizontal)
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: barChartSeriesData,
            type: "bar",
          },
        ],
      };
    });
  }

  // Genera colores aleatorios
  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  }
}
