import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ITratamientoMostrar } from '../../interface/tratamiento.interface';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder } from '@angular/forms';
import { TratamientoService } from '../../service/service.service';
import { DomSanitizer } from '@angular/platform-browser';
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
    size: 'lg', // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
    backdrop:'static'
  };
  //tratamientoList:ITratamientoMostrar[]=[];
  @Input()ListaDeTratamiento:ITratamientoMostrar[]=[];
  @Output()ObjetoTratamientoEliminar= new EventEmitter<ITratamientoMostrar>();
  @Output()ObjetoTratamientoModificar= new EventEmitter<ITratamientoMostrar>();
  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<ITratamientoMostrar> = new Subject<ITratamientoMostrar>();
  tratamiento?:ITratamientoMostrar;
  constructor(private serviceTratamiento:TratamientoService,
    private dm:DomSanitizer, private fb: FormBuilder,public modalService:NgbModal) { }

  ngOnInit(): void {
    this.dtOptions = {
      columnDefs: [
        { className: "center", targets: [0, 1, 2, 4] },
        { width: "15%", targets: [0] },
        { width: "40%", targets: [1, 3] },
        { width: "20%", targets: [2] },
        { responsivePriority: 5, targets: 1 },
        { responsivePriority: 10001, targets: 3 },
        { responsivePriority: 1, targets: 4 },
        { responsivePriority: 0, targets: -1 }
      ],
      lengthMenu: [5, 10, 15, 20],
      destroy: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json",
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningun Dato encontrado",
      },
      pagingType: "full_numbers",
      responsive: true,
    };
    this.listaTratamiento();
  }

  ObtenerTratamientoEliminar(tratamiento:ITratamientoMostrar){
    this.ObjetoTratamientoEliminar.emit(tratamiento);//para emitar el evento de objeto a la vista del padre
  }
  ObtenerTratamientoModificar(tratamiento:ITratamientoMostrar){
    this.ObjetoTratamientoModificar.emit(tratamiento);
  }
  listaTratamiento(){
    this.serviceTratamiento.listaDeTratamiento().subscribe((resp)=>{
      this.ListaDeTratamiento=resp;
      this.ListaDeTratamiento.forEach(element => {
        this.serviceTratamiento.getImagen(element.urlTratamiento).subscribe((resp)=>{
          let url=URL.createObjectURL(resp);
          this.imagen=this.dm.bypassSecurityTrustUrl(url);
          element.imagen=this.imagen;
          element.archivo=this.convertirArchivo(resp,element.urlTratamiento);
          this.dtTrigger.next(null);
        });
      });

    })
  }
  convertirArchivo(blob: Blob | undefined, url:string): File {
    let miArchivo!: File;
    let nombre=url.substring(36);
    if (blob != undefined) {
      miArchivo = new File([blob], nombre, {
        type: blob.type,
      });
      return miArchivo;
    } else {
      return miArchivo;
    }
  }
  openModal(content: any,tratamiento:ITratamientoMostrar) {
    this.tratamiento=tratamiento;
    this.modalService.open(content, {
      size: "xl",
      centered: true,
      backdrop: "static",
      keyboard: false,
    });

  }
}
