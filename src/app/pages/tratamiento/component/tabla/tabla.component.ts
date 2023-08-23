import { Component, OnInit } from '@angular/core';
import { ITratamientoMostrar } from '../../interface/tratamiento.interface';
import { TratamientoService } from '../../service/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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
        //console.log(element.url);
        this.ObtenerImagen(element.url);
        //console.log(this.imagen);
        //element.imagen=this.imagen;
        //console.log(element.imagen);
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
}
