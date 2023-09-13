import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IEnfermedadMostrar } from '../../interfaces/IEnfermedad';
import { DataTableDirective } from 'angular-datatables';  
import { Subject } from 'rxjs';
import { EnfermedadService } from '../../service/enfermedad.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  p: any;
  imagen:any;
  
  @Input()listaEnfermedades:IEnfermedadMostrar[]=[];
  @Output()ObjetoEnfermedadEliminar= new EventEmitter<IEnfermedadMostrar>();
  @Output()ObjetoEnfermedadModificar= new EventEmitter<IEnfermedadMostrar>();
  @ViewChild(DataTableDirective, { static: false} ) 
  dtElement: DataTableDirective;

   dtOptions: any = {};
  //dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<IEnfermedadMostrar> = new Subject<IEnfermedadMostrar>();

  constructor(
    private enfService: EnfermedadService,
    private dm:DomSanitizer
    ) { }

  ngOnInit(): void {
    this.dtOptions={
      columnDefs: [
        { responsivePriority: 3, targets: 0 },
        //{ responsivePriority: 10001, targets: 3 },
        { responsivePriority: 2, targets: 4 },
        { responsivePriority: 1, targets: -1 },
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
    this.lista();
  }
  
  obtenerEnfermedadEliminar(enfermedad:IEnfermedadMostrar){
    //console.log(enfermedad);
    this.ObjetoEnfermedadEliminar.emit(enfermedad);//para emitar el evento de objeto a la vista del padre
  }
  
  obtenerEnfermedadModificar(enfermedad:IEnfermedadMostrar){
    //console.log(enfermedad);
    this.ObjetoEnfermedadModificar.emit(enfermedad);
  }

  lista() {
    this.enfService.listaEnfermedades().subscribe((lista) => {
      this.listaEnfermedades = lista;
      this.listaEnfermedades.forEach(element => {
        this.enfService.getImagen(element.urlEnfermedad).subscribe((resp)=>{
          //console.log(resp);
          let url=URL.createObjectURL(resp);
          this.imagen=this.dm.bypassSecurityTrustUrl(url);
          //console.log(this.imagen);
          element.imagen=this.imagen;
          //nuevo
          element.archivo=this.convertirArchivo(resp,element.urlEnfermedad);
          //console.log(element.archivo);
          this.dtTrigger.next(null);
        });
      });
    });
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
