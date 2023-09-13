import { Component, OnInit } from '@angular/core';
import { IEnfermedad, IEnfermedadMostrar } from '../../enfermedades/interfaces/IEnfermedad';
import { EnfermedadService } from '../../enfermedades/service/enfermedad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  imagen: any;
  //causa:ITipoCausa
  enfermedad: IEnfermedad | undefined;
  constructor(
    private serviceEnfermedad: EnfermedadService,
    private route: ActivatedRoute,
    private dm: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const idEnfermedad = params["idEnfermedad"];
      // Utiliza idTipoCausa para cargar los detalles del elemento específico
      this.buscarEnfermedad(idEnfermedad);
    });
  }

  buscarEnfermedad(idEnfermedad: string) {
    // Buscamos el patógeno específico por su id
    this.serviceEnfermedad.buscarEnfermedad(idEnfermedad).subscribe(
      (data) => {
        this.enfermedad = data;
        //console.log(this.enfermedad.urlEnfermedad);
        this.ObtenerImagen(this.enfermedad.urlEnfermedad);
          /* this.serviceEnfermedad.getImagen(this.enfermedad.urlEnfermedad).subscribe((resp) => {
            let url = URL.createObjectURL(resp);
            this.imagen = this.dm.bypassSecurityTrustUrl(url);
            //this.enfermedad.urlEnfermedad = this.imagen;
          }); */
      },
      (error) => {
        console.error("Error al obtener los detalles de la enfermedad:", error);
      }
    );
  }
  
  
  ObtenerImagen(url: string) {
    this.serviceEnfermedad.getImagen(url).subscribe((resp) => {
      //console.log(resp);
      let url = URL.createObjectURL(resp);
      this.imagen = this.dm.bypassSecurityTrustUrl(url);
      this.enfermedad.urlEnfermedad = this.imagen;
      //console.log(this.imagen);
    });
  }
}