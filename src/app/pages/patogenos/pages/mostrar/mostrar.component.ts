import { Component, Input, OnInit } from "@angular/core";
import { ITipoCausa } from "../../../causa-enfermedad/models/TipoCausa";
import { CausaenfermedadService } from "../../../causa-enfermedad/services/causaenfermedad.service";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-mostrar",
  templateUrl: "./mostrar.component.html",
  styleUrls: ["./mostrar.component.scss"],
})
export class MostrarComponent implements OnInit {
  @Input() alltipocausa!: ITipoCausa[];
  imagen: any;
  constructor(
    private causaenfermedad: CausaenfermedadService,
    private router: Router,
    private dm: DomSanitizer
  ) {}

  ngOnInit() {
    this.listatipo();
  }
  listatipo() {
    this.causaenfermedad.listaDeTipoCausa().subscribe((resp) => {
      this.alltipocausa = resp;
      console.log(resp);
      this.alltipocausa.forEach((element) => {
        this.causaenfermedad.getImagen(element.urlTC).subscribe((resp) => {
          let url = URL.createObjectURL(resp);
          this.imagen = this.dm.bypassSecurityTrustUrl(url);
          element.imagen = this.imagen;
        });
      });
    });
  }
  ObtenerImagen(url: string) {
    this.causaenfermedad.getImagen(url).subscribe((resp) => {
      console.log(resp);
      let url = URL.createObjectURL(resp);
      this.imagen = this.dm.bypassSecurityTrustUrl(url);
      console.log(this.imagen);
    });
  }

  verDetalle(idTipoCausa: string) {
    // Navega a la ruta del componente de detalle, pasando el ID como parámetro
    this.router.navigate(['patogenos/detalle', idTipoCausa]);
  }
 
  
}
