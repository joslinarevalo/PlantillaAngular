import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { IPlantaMostrar } from '../../interface/iplanta';
import { Subject } from 'rxjs';
import { PlantaService } from '../../service/planta.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  p: any;
  imagen:any;
  modalOptions: NgbModalOptions = {
    ariaLabelledBy: 'modal-basic-title',
    size: 'md', // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
    backdrop:'static'
  };
  @Input()ListaDePlanta:IPlantaMostrar[]=[];
  @Output()ObjetoPlantaEliminar= new EventEmitter<IPlantaMostrar>();
  @Output()ObjetoPlantaModificar= new EventEmitter<IPlantaMostrar>();
  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<IPlantaMostrar> = new Subject<IPlantaMostrar>();
  planta?:IPlantaMostrar;
  constructor(private servicePlanta:PlantaService,
    private dm:DomSanitizer,
    public modalService:NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dtOptions={
      columnDefs: [
        { responsivePriority: 5, targets: 3 },
        { responsivePriority: 4, targets: 2 },
        { responsivePriority: 3, targets: 1 },
        { responsivePriority: 1, targets: [7, -1] },
    ],
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
    this.listaPlanta();
  }

  ObtenerPlantaEliminar(planta:IPlantaMostrar){
    console.log(planta);
    this.ObjetoPlantaEliminar.emit(planta);//para emitar el evento de objeto a la vista del padre
  }
  ObtenerPlantaModificar(planta:IPlantaMostrar){
    console.log(planta);
    this.ObjetoPlantaModificar.emit(planta);
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

  openModal(content: any,planta:IPlantaMostrar) {
    this.planta=planta;
    this.modalService.open(content, {
      size: "xl",
      centered: true,
      backdrop: "static",
      keyboard: false,
    });

  }

}
