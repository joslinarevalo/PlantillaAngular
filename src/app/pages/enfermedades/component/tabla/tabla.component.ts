import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IEnfermedad, IEnfermedadMostrar } from '../../interfaces/IEnfermedad';
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
  breadCrumbItems: Array<{}>;

  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<IEnfermedad> = new Subject<IEnfermedad>();

  p: any;
  imagen:any;

  @Input()listaEnfermedades:IEnfermedadMostrar[]=[];
  @Output()ObjetoEnfermedadEliminar= new EventEmitter<IEnfermedadMostrar>();
  @Output()ObjetoEnfermedadModificar= new EventEmitter<IEnfermedadMostrar>();
  
  constructor(
    private enfService: EnfermedadService,
    private dm:DomSanitizer
    ) { }

  ngOnInit(): void {
    this.dtOptions={
     /*  columnDefs:[ */
       /*  {className: "center", targets: [0,1,2,3]},
       // {orderable: false, targets: [3]},
       //{searchable: false, targets: [0,3]},
        {width: "15%", targets: [0]},
        {width: "50%", targets: [1,3]},
        {width: "20%", targets: [2]}, */
      /* ],  */
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
    console.log(enfermedad);
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
        });
      });

      this.dtTrigger.next(null);
    });
  }
}
