import { Component, OnInit } from "@angular/core";
import { PlantaService } from "../../planta/service/planta.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { DetallecausaService } from "../../detalle-causa/services/detallecausa.service";
import { IPlanta } from "../../planta/interface/iplanta";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.scss"],
})
export class DetalleComponent implements OnInit {
  imagen: any;
  planta!: IPlanta;
  detallesCausa: any;
  idPlanta: any;
  constructor(
    private servicePlanta: PlantaService,
    private serviceDetalleCausa: DetallecausaService,
    private route: ActivatedRoute,
    private router: Router,
    private dm: DomSanitizer
  ) {}

  ngOnInit() {
      this.route.params.subscribe((params) => {
        this.idPlanta = params["idPlanta"];
        console.log("probanding"+this.idPlanta)
        this.buscarPlanta(this.idPlanta);
        this.obtenerDetallesCausa(this.idPlanta);
      });

  }

  buscarPlanta(idPlanta: string) {
    // Buscamos el patógeno específico por su id
    this.servicePlanta.buscarPlanta(idPlanta).subscribe(
      (data) => {
        this.planta = data;
        this.servicePlanta
          .getImagen(this.planta.urlPlanta)
          .subscribe((resp) => {
            let url = URL.createObjectURL(resp);
            this.imagen = this.dm.bypassSecurityTrustUrl(url);
            this.planta.urlPlanta = this.imagen;
          });
      },
      (error) => {
        console.error("Error al obtener los detalles de la planta:", error);
      }
    );
  }

  /* buscarPlanta(idPlanta: string) {
    this.servicePlanta.buscarPlanta(idPlanta).subscribe(
      (data) => {
        this.planta = data;
        console.log(this.planta); // Console log borrar
        this.ObtenerImagen(this.planta.urlPlanta);
      },
      (error) => {
        console.error("Error al obtener los detalles de la Planta:", error);
      }
    );
  }*/

  obtenerDetallesCausa(idPlanta: string) {
    this.serviceDetalleCausa.obtenerDetallesCausaPorPlanta(idPlanta).subscribe(
      (data) => {
        // Aquí puedes almacenar los detalles de la causa relacionados con la planta
        this.detallesCausa = data;

        console.log("detalle por planta", this.detallesCausa);
      },
      (error) => {
        console.error("Error al obtener los detalles de causa:", error);
      }
    );
  }
  /*ObtenerImagen(url: string) {
    this.servicePlanta.getImagen(url).subscribe((resp) => {
      let url = URL.createObjectURL(resp);
      this.imagen = this.dm.bypassSecurityTrustUrl(url);
      this.planta.urlPlanta = this.imagen;
    });
  }*/
}
