import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/usuario/models/Usuario';
import { IUsuarioMostrar } from '../../interface/usuario.interface';
import { UsuarioServiceService } from '../../service/usuario-service.service';

@Component({
  selector: 'app-tablaUser',
  templateUrl: './tablaUser.component.html',
  styleUrls: ['./tablaUser.component.scss']
})
export class TablaUserComponent implements OnInit {
  @Input()listUsuario:IUsuarioMostrar[]=[];
  @Output()ObjetoUsuarioEliminar= new EventEmitter<IUsuarioMostrar>();
  @Output()ObjetoUsuarioModificar= new EventEmitter<IUsuarioMostrar>();
  @ViewChild(DataTableDirective, { static: false} )
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<IUsuarioMostrar> = new Subject<IUsuarioMostrar>();
  constructor(private UsuarioService:UsuarioServiceService) { }

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
      responsive: true
    };
    this.listaUsuario();
  }

  ObtenerUsuarioEliminar(Usuario:IUsuarioMostrar){
    this.ObjetoUsuarioEliminar.emit(Usuario);//para emitar el evento de objeto a la vista del padre
  }
  ObtenerUsuarioModificar(Usuario:IUsuarioMostrar){
    this.ObjetoUsuarioModificar.emit(Usuario);
  }
  listaUsuario(){
    this.UsuarioService.listaDeUsuarios().subscribe((resp)=>{
      this.listUsuario=resp;
      this.dtTrigger.next(null);
    });
  }
  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
    //this.dtTrigger.complete();
  }
  public reloadTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.listUsuario = [];
      dtInstance.destroy();
    });
  }

}
