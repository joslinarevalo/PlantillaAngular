import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BuscarTramiento, ITratamientoMostrar } from 'src/app/pages/tratamiento/interface/tratamiento.interface';
import { TratamientoService } from 'src/app/pages/tratamiento/service/service.service';

@Component({
  selector: 'app-cardTratamiento',
  templateUrl: './cardTratamiento.component.html',
  styleUrls: ['./cardTratamiento.component.css']
})
export class CardTratamientoComponent implements OnInit {
  @Input() tratamiento: BuscarTramiento;
  imagen: any;

  constructor(private tratamientoService: TratamientoService, private router: Router, private dm: DomSanitizer) { }

  ngOnInit() {
    this.cargaImagen();
  }

  cargaImagen() {
    if (this.tratamiento && this.tratamiento.urlTratamiento) {
      this.tratamientoService.getImagen(this.tratamiento.urlTratamiento).subscribe((resp) => {
        let url = URL.createObjectURL(resp);
        this.imagen = this.dm.bypassSecurityTrustUrl(url);
        if (this.tratamiento) {
          this.tratamiento.imagen = this.imagen;
        }
      });
    }
  }

  verDetalle(idtratamiento: string) {
    console.error('ID de tratamiento indefinido o faltante.',idtratamiento);
    console.error(['..../consultaTratamiento/detalle', idtratamiento]);
    if (idtratamiento) {
  
      // Navega a la ruta del componente de detalle, pasando el ID como parámetro
      this.router.navigate(['consultaTratamiento/detalle', idtratamiento]);
    } else {
      console.error('ID de tratamiento indefinido o faltante.');
    }
  }
}
