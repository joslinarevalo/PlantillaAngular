import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ITratamientoConsulta, ITratamientoMostrar } from 'src/app/pages/tratamiento/interface/tratamiento.interface';
import { TratamientoService } from 'src/app/pages/tratamiento/service/service.service';
import {  Router} from '@angular/router';
@Component({
  selector: 'app-consulta-tratamiento',
  templateUrl: './consulta-tratamiento.component.html',
  styleUrls: ['./consulta-tratamiento.component.scss']
})
export class ConsultaTratamientoComponent implements OnInit {
  tratamientoList:ITratamientoMostrar[]=[];
  tratamientoListPaginada:ITratamientoMostrar[]=[];
  imagen:any;
  pagina:number=0;
  tamaño:number=5;
  constructor(private tratamientoService:TratamientoService, private router: Router,
    private dm: DomSanitizer) { }

  ngOnInit(): void {
    this.listaTratamientoPaginada();
    
  }
  listaTratamiento(){
    this.tratamientoService.listaDeTratamiento().subscribe((resp)=>{
      this.tratamientoList=resp;
      console.log(resp);
      this.tratamientoList.forEach(element => {
        this.tratamientoService.getImagen(element.urlTratamiento).subscribe((resp)=>{
          //console.log(resp);
          let url=URL.createObjectURL(resp);
          this.imagen=this.dm.bypassSecurityTrustUrl(url);
          //console.log(this.imagen);
          element.imagen=this.imagen;
          console.log(element.archivo);
        });
      });

    })
  }
  listaTratamientoPaginada(){
    this.tratamientoService.listaDeTratamientoPaginacion(this.pagina,this.tamaño).subscribe((resp)=>{
      console.log(resp);
      this.tratamientoListPaginada=resp;
      this.tratamientoListPaginada.forEach(element => {
        this.tratamientoService.getImagen(element.urlTratamiento).subscribe((resp)=>{
          //console.log(resp);
          let url=URL.createObjectURL(resp);
          this.imagen=this.dm.bypassSecurityTrustUrl(url);
          //console.log(this.imagen);
          element.imagen=this.imagen;
          console.log(element.archivo);
        });
      });
    })
  }
  ObtenerImagen(url: string) {
    this.tratamientoService.getImagen(url).subscribe((resp) => {
      console.log(resp);
      let url = URL.createObjectURL(resp);
      this.imagen = this.dm.bypassSecurityTrustUrl(url);
      console.log(this.imagen);
    });
  }

  verDetalle(idTratamiento: string) {
    // Navega a la ruta del componente de detalle, pasando el ID como parámetro
    this.router.navigate(['consultaTratamiento/detalle', idTratamiento]);
   
  }
  onScroll(){
    console.log("scroll infinito")
    this.tamaño+=5;
    this.listaTratamientoPaginada();
  }

}
