import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/usuario/models/Usuario';

@Component({
  selector: 'app-tablaUser',
  templateUrl: './tablaUser.component.html',
  styleUrls: ['./tablaUser.component.scss']
})
export class TablaUserComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false} ) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Usuario> = new Subject<Usuario>();
  usuario?:Usuario;
  constructor(private fb: FormBuilder,public modalService:NgbModal) { }

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
    this.listaUsuario();
  }
  listaUsuario(){}
  openModal(content: any,usuario:Usuario) {
    this.usuario=usuario;
    this.modalService.open(content, {
      size: "xl",
      centered: true,
      backdrop: "static",
      keyboard: false,
    });

  }

}
