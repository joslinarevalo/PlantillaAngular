import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { DetallecausaService } from "../../services/detallecausa.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { DetalleCausa } from "../../models/DetalleCausa";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { mensajeError, mensajeExito } from "src/app/pages/models/funciones.global";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-tabla",
  templateUrl: "./tabla.component.html",
  styleUrls: ["./tabla.component.css"],
})
export class TablaComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<DetalleCausa> = new Subject<DetalleCausa>();
  @Input() listaDetalle!: DetalleCausa[];
  formularioDetalleCausa!: FormGroup;
  constructor(
    private detallecausaservice: DetallecausaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dtOptions = {
      columnDefs: [
        { className: "center", targets: [0, 1, 2, 4] },
        //{orderable: false, targets: [4]},
        //{searchable: false, targets: [0,3]},
        { width: "15%", targets: [0] },
        { width: "40%", targets: [1, 3] },
        { width: "20%", targets: [2] },
        { responsivePriority: 2, targets: 1 },
        { responsivePriority: 10001, targets: 3 },
        { responsivePriority: 1, targets: 3 },
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
    this.obtenerDetalle();
  }
  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  }

  obtenerDetalle() {
    this.detallecausaservice.getDetalle().subscribe((detalle) => {
      this.listaDetalle = detalle;
      this.dtTrigger.next(null);
    });
  }
  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
    this.dtTrigger.complete();
  }
 
  public reloadTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.listaDetalle = [];
      dtInstance.destroy();
    });
  }
  
  eliminarDetalle(detalle: DetalleCausa) {
    const alert = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    alert
      .fire({
        title: "¿Estas Seguro?",
        text: `¡No podras revertir esto!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, borrar",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.detallecausaservice
            .eliminar(detalle.idDetalleCausa)
            .subscribe((resp) => {
              alert.fire(
                "Eliminado",
                "El registro ha sido eliminado",
                "success"
              );
             this.reloadTable();
             this.ngOnInit();
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alert.fire("Canselado", "El registro no se elimino", "error");
        }
      });
  }


}
