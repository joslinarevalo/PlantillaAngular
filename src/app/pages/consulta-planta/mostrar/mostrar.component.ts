import { Component, Input, OnInit } from '@angular/core';
import { IPlanta, IPlantaMostrar, IPlantaValid } from '../../planta/interface/iplanta';
import { PlantaService } from '../../planta/service/planta.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {
  @Input() allPlanta!: IPlanta[];
  imagen: any;
  searchTerm: string = "";
  filtrarPlanta: IPlanta[]=[];
  pagina:number=0;
  tamaño:number=5;

  constructor(
    private servicePlanta: PlantaService,
    private router: Router,
    private dm: DomSanitizer
  ) { }

  ngOnInit() {
    this.listaPlantaPaginada();
  }

  filterCards() {
    // Si el término de búsqueda está vacío, muestra todas las cards
    if (this.searchTerm.trim() === "") {
      this.filtrarPlanta = this.allPlanta;
    } else {
      // Filtrar el array de datos usando el término de búsqueda
      this.filtrarPlanta = this.allPlanta.filter((buscar) =>
        buscar.nombreComunPlanta.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  verDetalle(idPlanta: string) {
    // Navega a la ruta del componente de detalle, pasando el ID como parámetro
    this.router.navigate(['consultaPlantas/detalle', idPlanta]);
  }

  onScroll(){
    this.tamaño+=5;
    this.listaPlantaPaginada();
  }

  listaPlantaPaginada(){
    this.servicePlanta.listaDePlantaPaginacion(this.pagina,this.tamaño).subscribe((resp)=>{
      this.allPlanta=resp;
      this.allPlanta.forEach(element => {
        this.servicePlanta.getImagen(element.urlPlanta).subscribe((resp)=>{
          let url=URL.createObjectURL(resp);
          this.imagen=this.dm.bypassSecurityTrustUrl(url);
          element.imagen=this.imagen;
        });
      });
      this.filtrarPlanta = this.allPlanta;
    });
  }


}
