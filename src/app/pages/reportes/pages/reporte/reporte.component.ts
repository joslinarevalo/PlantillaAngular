import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ReporteService } from '../../service/reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  constructor(private reporteService:ReporteService) { }

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
  }
  descargarPdf(nombre:string){
    this.reporteService.generarConsultaPdf(nombre).subscribe((data:Blob)=>{
      const blob= new Blob([data],{type:'application/pdf'});
      const link=document.createElement('a');
      link.href=URL.createObjectURL(blob);
      link.download=nombre+".pdf";
      link.click();
    });
  }

}
