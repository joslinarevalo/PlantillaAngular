import { Component, Input, OnInit } from '@angular/core';
import { IEnfermedadMostrar } from '../../enfermedades/interfaces/IEnfermedad';
import { EnfermedadService } from '../../enfermedades/service/enfermedad.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {
  @Input() allEnfermedad!: IEnfermedadMostrar[];
  imagen: any;
  constructor(
    private serviceEnfermedad: EnfermedadService,
    private router: Router,
    private dm: DomSanitizer
  ) {}

  ngOnInit() {
    this.listatipo();
  }
  listatipo() {
    this.serviceEnfermedad.listaEnfermedades().subscribe((resp) => {
      this.allEnfermedad = resp;
      console.log(resp);
      this.allEnfermedad.forEach((element) => {
        this.serviceEnfermedad.getImagen(element.urlEnfermedad).subscribe((resp) => {
          let url = URL.createObjectURL(resp);
          this.imagen = this.dm.bypassSecurityTrustUrl(url);
          element.imagen = this.imagen;
        });
      });
    });
  }

  ObtenerImagen(url: string) {
    this.serviceEnfermedad.getImagen(url).subscribe((resp) => {
      console.log(resp);
      let url = URL.createObjectURL(resp);
      this.imagen = this.dm.bypassSecurityTrustUrl(url);
      console.log(this.imagen);
    });
  }

  verDetalle(idEnfermedad: string) {
    // Navega a la ruta del componente de detalle, pasando el ID como parámetro
    this.router.navigate(['consultaEnfermedades/detalle', idEnfermedad]);
   
  }
}
