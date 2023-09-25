import { Component, Input, OnInit } from '@angular/core';
import { IBuscarPlanta, IPlantaMostrar } from '../../planta/interface/iplanta';
import { Router } from '@angular/router';
import { PlantaService } from '../../planta/service/planta.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cardPlanta',
  templateUrl: './cardPlanta.component.html',
  styleUrls: ['./cardPlanta.component.css']
})
export class CardPlantaComponent implements OnInit {
  @Input() planta: IBuscarPlanta;
  imagen: any;
  
  constructor(
    private servicePlanta: PlantaService,
    private router: Router,
    private dm: DomSanitizer
  ) { }

  ngOnInit() {
   this.cargaImagen();
  }
 
  cargaImagen() {
    // Cargar la imagen directamente en this.planta
    this.servicePlanta.getImagen(this.planta.urlPlanta).subscribe((resp) => {
      let url = URL.createObjectURL(resp);
      this.imagen = this.dm.bypassSecurityTrustUrl(url);
      this.planta.imagen = this.imagen; // Asignar la imagen a this.planta
    });
    console.log("planta",this.planta.nombreCientificoPlanta);
  }
  ObtenerImagen(url: string) {
    this.servicePlanta.getImagen(url).subscribe((resp) => {
      console.log(resp);
      let url = URL.createObjectURL(resp);
      this.imagen = this.dm.bypassSecurityTrustUrl(url);
      console.log(this.imagen);
    });
  }

  verDetalle(idPlanta: string) {
    // Navega a la ruta del componente de detalle, pasando el ID como parámetro
    this.router.navigate(['consultaPlantas/detalle', idPlanta]);

  }
}
