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
  filtrarEnfermedad: IEnfermedadMostrar[];
  enfermedadListPaginada:IEnfermedadMostrar[]=[];
  pagina:number=0;
  tamaño:number=5;

  constructor(
    private serviceEnfermedad: EnfermedadService,
    private router: Router,
    private dm: DomSanitizer
  ) {}

  ngOnInit() {
    /* this.listaEnfermedades(); */
    this.listaEnfermedadPaginada();
  }

  filterCards() {
    // Si el término de búsqueda está vacío, muestra todas las cards
    if (this.searchTerm.trim() === "") {
      this.filtrarEnfermedad = this.enfermedadListPaginada;
    } else {
      // Filtrar el array de datos usando el término de búsqueda
      this.filtrarEnfermedad = this.allEnfermedad.filter((causa) =>
        causa.nombreComunEnfermedad.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  /* listaEnfermedades() {
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
       // Inicializa filteredCausas después de cargar los datos en allEnfermedad
    });
  } */

  listaEnfermedadPaginada(){
    this.serviceEnfermedad.listaDeEnfermedadPaginacion(this.pagina,this.tamaño).subscribe((resp)=>{
      console.log(resp);
      this.enfermedadListPaginada=resp;
      this.enfermedadListPaginada.forEach(element => {
        this.serviceEnfermedad.getImagen(element.urlEnfermedad).subscribe((resp)=>{
          //console.log(resp);
          let url=URL.createObjectURL(resp);
          this.imagen=this.dm.bypassSecurityTrustUrl(url);
          //console.log(this.imagen);
          element.imagen=this.imagen;
          console.log(element.archivo);
        });
      });
      this.filtrarEnfermedad = this.enfermedadListPaginada;
    });
  }

  /* obtenerImagen(url: string) {
    this.serviceEnfermedad.getImagen(url).subscribe((resp) => {
      //console.log(resp);
      let url = URL.createObjectURL(resp);
      this.imagen = this.dm.bypassSecurityTrustUrl(url);
      //console.log(this.imagen);
    });
  } */

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
