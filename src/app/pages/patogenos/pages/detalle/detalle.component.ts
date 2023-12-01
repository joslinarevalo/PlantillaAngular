import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ITipoCausa } from "src/app/pages/causa-enfermedad/models/TipoCausa";
import { CausaenfermedadService } from "src/app/pages/causa-enfermedad/services/causaenfermedad.service";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.scss"],
})
export class DetalleComponent implements OnInit {
  imagen: any;
  //causa:ITipoCausa
  causa: ITipoCausa | undefined;
  parrafos: string[] = [];

  constructor(
    private causaenfermedad: CausaenfermedadService,
    private route: ActivatedRoute,
    private dm: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const idTipoCausa = params["idTipoCausa"];
      // Utiliza idTipoCausa para cargar los detalles del elemento específico
      this.listatipo(idTipoCausa);
    });
  }
  listatipo(idTipoCausa: string) {
    // Buscamos el patógeno específico por su id
    this.causaenfermedad.obtenerPatogenoPorId(idTipoCausa).subscribe(
      (data) => {
        this.causa = data;
         this.parrafos = this.causa.definicionTipoTC.split('\n');
          this.causaenfermedad.getImagen(this.causa.urlTC).subscribe((resp) => {
            let url = URL.createObjectURL(resp);
            this.imagen = this.dm.bypassSecurityTrustUrl(url);
            this.causa.imagen = this.imagen;

          });
      },
      (error) => {
        console.error("Error al obtener los detalles del patógeno:", error);
      }
    );
  }


  ObtenerImagen(url: string) {
    this.causaenfermedad.getImagen(url).subscribe((resp) => {
      let url = URL.createObjectURL(resp);
      this.imagen = this.dm.bypassSecurityTrustUrl(url);
    });
  }
}
