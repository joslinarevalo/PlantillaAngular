import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ITratamientoMostrar } from '../../interface/tratamiento.interface';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder } from '@angular/forms';
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
  //tratamientoList:ITratamientoMostrar[]=[];
  @Input()ListaDeTratamiento:ITratamientoMostrar[]=[];
  @Output()ObjetoTratamientoEliminar= new EventEmitter<ITratamientoMostrar>();
  @Output()ObjetoTratamientoModificar= new EventEmitter<ITratamientoMostrar>();
  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ITratamientoMostrar> = new Subject<ITratamientoMostrar>();
  constructor(private serviceTratamiento:TratamientoService, 
    private dm:DomSanitizer, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dtOptions={
      lengthMenu: [5,10,15,20,50],
      destroy: true,
      language:{
        url: '//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json',
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: "Ninguna enfermedad encontrada",
      },
      pagingType: 'full_numbers',
      responsive: true,
    };
    this.listaTratamiento();
  }

  ObtenerTratamientoEliminar(tratamiento:ITratamientoMostrar){
    console.log(tratamiento);
    this.ObjetoTratamientoEliminar.emit(tratamiento);//para emitar el evento de objeto a la vista del padre
  }
  ObtenerTratamientoModificar(tratamiento:ITratamientoMostrar){
    console.log(tratamiento);
    this.ObjetoTratamientoModificar.emit(tratamiento);
  }
  listaTratamiento(){
    this.serviceTratamiento.listaDeTratamiento().subscribe((resp)=>{
      this.ListaDeTratamiento=resp;
      console.log(resp);
      this.ListaDeTratamiento.forEach(element => {
        this.serviceTratamiento.getImagen(element.urlTratamiento).subscribe((resp)=>{
          //console.log(resp);
          let url=URL.createObjectURL(resp);
          this.imagen=this.dm.bypassSecurityTrustUrl(url);
          //console.log(this.imagen);
          element.imagen=this.imagen;
          element.archivo=this.convertirArchivo(resp,element.urlTratamiento);
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
