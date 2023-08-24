import { Component, OnInit } from '@angular/core';
import { ITratamientoMostrar } from '../../interface/tratamiento.interface';
import { TratamientoService } from '../../service/service.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  p: any;
  imagen:any;
  tratamientoList:ITratamientoMostrar[]=[];
 
  constructor(private serviceTratamiento:TratamientoService, private dm:DomSanitizer) { }

  ngOnInit(): void {
    this.listaTratamiento();
    
  }
  listaTratamiento(){
    this.serviceTratamiento.ListaDeTratamiento().subscribe((resp)=>{
      this.tratamientoList=resp;
      console.log(resp);
      this.tratamientoList.forEach(element => {
        this.serviceTratamiento.getImagen(element.urlTratamiento).subscribe((resp)=>{
          //console.log(resp);
          let url=URL.createObjectURL(resp);
          this.imagen=this.dm.bypassSecurityTrustUrl(url);
          //console.log(this.imagen);
          element.imagen=this.imagen;
        });
      });
      
    })
  }
  ObtenerImagen(url:string){
    this.serviceTratamiento.getImagen(url).subscribe((resp)=>{
      console.log(resp);
      let url=URL.createObjectURL(resp);
      this.imagen=this.dm.bypassSecurityTrustUrl(url);
      console.log(this.imagen);
    });
  }
  ObtenerTratamientoEliminar(tratamiento:ITratamientoMostrar){
    console.log(tratamiento);
  }
  ObtenerTratamientoModificar(tratamiento:ITratamientoMostrar){
    console.log(tratamiento);
  }
}
