import { Component, Input, OnInit } from '@angular/core';
import { IPlantaMostrar } from '../../planta/interface/iplanta';
import { PlantaService } from '../../planta/service/planta.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {
  @Input() allPlanta!: IPlantaMostrar[];
  imagen: any;
  searchTerm: string = "";
  filtrarPlanta: IPlantaMostrar[]=[];
  //filtrarPlanta: IPlantaMostrar[];
  constructor(
    private servicePlanta: PlantaService,
    private router: Router,
    private dm: DomSanitizer
  ) { }

  ngOnInit() {
    this.listatipo();
  }

  filterCards() {
    // Si el término de búsqueda está vacío, muestra todas las cards
    if (this.searchTerm.trim() === "") {
      this.filtrarPlanta = this.allPlanta;
    } else {
      // Filtrar el array de datos usando el término de búsqueda
      this.filtrarPlanta = this.allPlanta.filter((buscar) =>
        buscar.nombreComun.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  listatipo() {
    this.servicePlanta.listaDePlanta().subscribe((resp) => {
      this.allPlanta = resp;
      console.log(resp);
      this.allPlanta.forEach((element) => {
        this.servicePlanta.getImagen(element.urlPlanta).subscribe((resp) => {
          let url = URL.createObjectURL(resp);
          this.imagen = this.dm.bypassSecurityTrustUrl(url);
          element.imagen = this.imagen;
        });
      });
       // Inicializa filteredCausas después de cargar los datos en allEnfermedad
       this.filtrarPlanta = this.allPlanta;
    });
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
