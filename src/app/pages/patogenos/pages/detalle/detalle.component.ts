import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ITipoCausa } from 'src/app/pages/causa-enfermedad/models/TipoCausa';
import { CausaenfermedadService } from 'src/app/pages/causa-enfermedad/services/causaenfermedad.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  imagen: any;
  causa:ITipoCausa
  constructor(private causaenfermedad: CausaenfermedadService,
    private router: Router,
    private dm: DomSanitizer) { }

    ngOnInit() {
  
    }
  
    ObtenerImagen(url: string) {
      this.causaenfermedad.getImagen(url).subscribe((resp) => {
        console.log(resp);
        let url = URL.createObjectURL(resp);
        this.imagen = this.dm.bypassSecurityTrustUrl(url);
        console.log(this.imagen);
      });
    }

}
