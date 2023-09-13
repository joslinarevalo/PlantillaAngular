import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { IPlantaMostrar } from '../../interface/iplanta';
import { Subject } from 'rxjs';
import { PlantaService } from '../../service/planta.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  p: any;
  imagen:any;
  //tratamientoList:ITratamientoMostrar[]=[];
  @Input()ListaDePlanta:IPlantaMostrar[]=[];
  @Output()ObjetoPlantaEliminar= new EventEmitter<IPlantaMostrar>();
  @Output()ObjetoPlantaModificar= new EventEmitter<IPlantaMostrar>();
  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<IPlantaMostrar> = new Subject<IPlantaMostrar>();
  constructor(private servicePlanta:PlantaService,
    private dm:DomSanitizer, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dtOptions={
      columnDefs: [
        { responsivePriority: 5, targets: 3 },
        { responsivePriority: 4, targets: 2 },
        { responsivePriority: 3, targets: 1 },
        { responsivePriority: 1, targets: [7, -1] },
    ],
      lengthMenu: [1,5,10,15,20,50],
      destroy: true,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json',
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: "Ninguna enfermedad encontrada",
      },
      pagingType: 'full_numbers',
      responsive: true,
    };
    this.listaPlanta();
  }

  ObtenerPlantaEliminar(tratamiento:IPlantaMostrar){
    console.log(tratamiento);
    this.ObjetoPlantaEliminar.emit(tratamiento);//para emitar el evento de objeto a la vista del padre
  }
  ObtenerPlantaModificar(tratamiento:IPlantaMostrar){
    console.log(tratamiento);
    this.ObjetoPlantaModificar.emit(tratamiento);
  }
  listaPlanta(){
    this.servicePlanta.listaDePlanta().subscribe((resp)=>{
      this.ListaDePlanta=resp;
      console.log(resp);
      this.ListaDePlanta.forEach(element => {
        this.servicePlanta.getImagen(element.urlPlanta).subscribe((resp)=>{
          //console.log(resp);
          let url=URL.createObjectURL(resp);
          this.imagen=this.dm.bypassSecurityTrustUrl(url);
          //console.log(this.imagen);
          element.imagen=this.imagen;
          element.archivo=this.convertirArchivo(resp,element.urlPlanta);
          console.log(element.archivo);
          this.dtTrigger.next(null);
        });
      });

    })
  }
  convertirArchivo(blob: Blob | undefined, url:string): File {
    let miArchivo!: File;
    let nombre=url.substring(36);
    console.log("nombre del archivo a modificar: "+nombre);
    if (blob != undefined) {
      miArchivo = new File([blob], nombre, {
        type: blob.type,
      });
      return miArchivo;
    } else {
      return miArchivo;
    }
  }

}
