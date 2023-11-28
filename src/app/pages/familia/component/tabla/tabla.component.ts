import { Component, Input, EventEmitter, OnInit, Output , ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { IFamilia } from '../../interfaces/ifamilia';
import { FamiliaService } from '../../service/familia.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<IFamilia> = new Subject<IFamilia>();

  p: any;

  @Input()listaFamilias:IFamilia[]=[];
  @Output()ObjetoFamiliaEliminar= new EventEmitter<IFamilia>();
  @Output()ObjetoFamiliaModificar= new EventEmitter<IFamilia>();

  constructor(private serviceFamilia:FamiliaService,
    private dm:DomSanitizer
  ) { }

  ngOnInit(): void {
    this.dtOptions={
      //autoWidth = TRUE,
      columnDefs: [
        // { className: "center", targets: [0, 1, 2] },
        { responsivePriority: 1, targets: -1 },
        { width: "5%", targets: [0] },
        { width: "75%", targets: [1] },
        { width: "20%", targets: [2] }
      ],
       lengthMenu: [5,10,50],
       destroy: true,
       language:{
         url: '//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json',
         lengthMenu: 'Mostrar _MENU_ registros por página',
         zeroRecords: "Ninguna familia encontrada",
       },
       pagingType: 'full_numbers',
       responsive: true,

     };
     this.lista();
  }

  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
  }

  lista() {
    this.serviceFamilia.listarFamilia().subscribe((lista) => {
      this.listaFamilias = lista;
      this.dtTrigger.next(null);
      });

    };

    obtenerFamiliaEliminar(familia:IFamilia){
      console.log("A eliminar "+familia);
      this.ObjetoFamiliaEliminar.emit(familia);//para emitar el evento de objeto a la vista del padre
    }

    obtenerFamiliaModificar(familia:IFamilia){
      console.log("A modificar " + familia);
      this.ObjetoFamiliaModificar.emit(familia);//para emitar el evento de objeto a la vista del padre
    }


}
