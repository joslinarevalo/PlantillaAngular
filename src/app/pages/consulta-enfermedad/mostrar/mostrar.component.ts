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
  searchTerm: string = "";
  filtrarEnfermedad: IEnfermedadMostrar[]=[];
  pagina:number=0;
  tamaño:number=5;

  constructor(
    private serviceEnfermedad: EnfermedadService,
    private router: Router,
    private dm: DomSanitizer
  ) {}

  ngOnInit() {
    this.listaEnfermedadPaginada();
  }

  filterCards() {
    // Si el término de búsqueda está vacío, muestra todas las cards
    if (this.searchTerm.trim() === "") {
      this.filtrarEnfermedad = this.allEnfermedad;
    } else {
      // Filtrar el array de datos usando el término de búsqueda
      this.filtrarEnfermedad = this.allEnfermedad.filter((nombre) =>
        nombre.nombreComunEnfermedad.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  listaEnfermedadPaginada(){
    this.serviceEnfermedad.listaDeEnfermedadPaginacion(this.pagina,this.tamaño).subscribe((resp)=>{
      this.allEnfermedad=resp;
      this.allEnfermedad.forEach(element => {
        this.serviceEnfermedad.getImagen(element.urlEnfermedad).subscribe((resp)=>{
          let url=URL.createObjectURL(resp);
          this.imagen=this.dm.bypassSecurityTrustUrl(url);
          element.imagen=this.imagen;
        });
      });
      this.filtrarEnfermedad = this.allEnfermedad;
    });
  }

  verDetalle(idEnfermedad: string) {
    // Navega a la ruta del componente de detalle, pasando el ID como parámetro
    this.router.navigate(['consultaEnfermedades/detalle', idEnfermedad]);
  }

  onScroll(){
    console.log("scroll infinito")
    this.tamaño+=5;
    this.listaEnfermedadPaginada();
  }

}
