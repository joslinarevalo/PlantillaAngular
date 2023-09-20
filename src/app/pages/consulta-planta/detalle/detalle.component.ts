import { Component, OnInit } from '@angular/core';
import { IPlanta, IPlantaValid } from '../../planta/interface/iplanta';
import { PlantaService } from '../../planta/service/planta.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  imagen: any;

  // planta: IPlanta | undefined;
  planta: any;
  constructor(
    private servicePlanta: PlantaService,
    private route: ActivatedRoute,
    private dm: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const idPlanta = params["idPlanta"];
      // Utiliza idTipoCausa para cargar los detalles del elemento específico
      this.buscarPlanta(idPlanta);
    });
  }

  buscarPlanta(idPlanta: string) {
    // Buscamos el patógeno específico por su id
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
  }


  ObtenerImagen(url: string) {
    this.servicePlanta.getImagen(url).subscribe((resp) => {
      //console.log(resp);
      let url = URL.createObjectURL(resp);
      this.imagen = this.dm.bypassSecurityTrustUrl(url);
      this.planta.urlPlanta = this.imagen;
      //console.log(this.imagen);
    });
  }

}
