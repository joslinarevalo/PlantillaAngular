
import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { CausaenfermedadService } from "../../services/causaenfermedad.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { DataTableDirective } from "angular-datatables";
import { ITipoCausa, TipoCausa } from "../../models/TipoCausa";
import { DomSanitizer } from "@angular/platform-browser";
import { Subject } from "rxjs";

@Component({
  selector: "app-tablaCausa",
  templateUrl: "./tablaCausa.component.html",
  styleUrls: ["./tablaCausa.component.scss"],
})
export class TablaCausaComponent implements OnInit , OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<TipoCausa> = new Subject<TipoCausa>();
  @Input() alltipocausa!: ITipoCausa[];
  imagen: any;
  constructor(
    private causaenfermedad: CausaenfermedadService,
    private router: Router,
    private dm: DomSanitizer
  ) {}
  ngOnInit() {
    this.dtOptions = {
      columnDefs: [
        { responsivePriority: 3, targets: 2 },
        { responsivePriority: 10001, targets: 2 },
        { responsivePriority: 2, targets: 3 },
        { responsivePriority: 0, targets: -1 }
      ],
      lengthMenu: [5, 10, 15, 20],
      destroy: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json',
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: "Ninguna enfermedad encontrada",
      },
      pagingType: 'full_numbers',
      responsive: true,
    };
    this.listatipo();
  }
  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
   // this.dtTrigger.complete();
  }
  public reloadTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.alltipocausa = [];
      dtInstance.destroy();
    });
  }

  listatipo() {
    this.causaenfermedad.listaDeTipoCausa().subscribe((resp) => {
      this.alltipocausa = resp;
      console.log(resp);
      this.alltipocausa.forEach(element => {
        this.causaenfermedad.getImagen(element.urlTC).subscribe((resp) => {
          let url = URL.createObjectURL(resp);
          this.imagen = this.dm.bypassSecurityTrustUrl(url);
          element.imagen = this.imagen;
        });

      });
      // Inicializa o actualiza el DataTable una vez que los datos se han cargado
      if (this.dtElement && this.dtElement.dtInstance) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.dtTrigger.next();
      }
    });
  }
  ObtenerImagen(url: string) {
    this.causaenfermedad.getImagen(url).subscribe((resp) => {
      console.log(resp);
      let url = URL.createObjectURL(resp);
      this.imagen = this.dm.bypassSecurityTrustUrl(url);
      console.log(this.imagen);
    });
  }

  eliminarCausita(cusatp: ITipoCausa) {
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
          this.causaenfermedad.eliminarCausa(cusatp).subscribe((resp) => {
            alert.fire("Eliminado", "El registro ha sido eliminado", "success");
           //this.reloadTable();
            //  this.ngOnInit();
            this.listatipo();
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          alert.fire("Canselado", "El registro no se elimino", "error");
        }
      });
  }

}
