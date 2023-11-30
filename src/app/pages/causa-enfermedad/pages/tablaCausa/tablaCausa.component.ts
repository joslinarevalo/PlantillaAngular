import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { CausaenfermedadService } from "../../services/causaenfermedad.service";
import { Router } from "@angular/router";
import { DataTableDirective } from "angular-datatables";
import { ITipoCausa, TipoCausa } from "../../models/TipoCausa";
import { DomSanitizer } from "@angular/platform-browser";
import { Subject } from "rxjs";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-tablaCausa",
  templateUrl: "./tablaCausa.component.html",
  styleUrls: ["./tablaCausa.component.scss"],
})
export class TablaCausaComponent implements OnInit, OnDestroy {
  p: any;
  imagen: any;
  modalOptions: NgbModalOptions = {
    ariaLabelledBy: "modal-basic-title",
    size: "lg", // sm (SMALL), md (MEDIANO), lg (LARGO),xl (EXTRA LARGO)
    backdrop: "static",
  };
  @Input() ListaDeCausa: ITipoCausa[] = [];
  @Output() ObjetoCausaEliminar = new EventEmitter<ITipoCausa>();
  @Output() ObjetoCausaModificar = new EventEmitter<ITipoCausa>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<ITipoCausa> = new Subject<ITipoCausa>();
  causa?: ITipoCausa;

  dtOptions: any = {};
  constructor(
    private causaenfermedad: CausaenfermedadService,
    private router: Router,
    private dm: DomSanitizer,
    public modalService: NgbModal
  ) {}
  ngOnInit() {
    this.dtOptions = {
      columnDefs: [
        { responsivePriority: 3, targets: 2 },
        { responsivePriority: 10001, targets: 2 },
        { responsivePriority: 2, targets: 3 },
        { responsivePriority: 0, targets: -1 },
      ],
      lengthMenu: [5, 10, 15, 20],
      destroy: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json",
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ninguna enfermedad encontrada",
      },
      pagingType: "full_numbers",
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
      this.ListaDeCausa = [];
      dtInstance.destroy();
    });
  }
  listatipo() {
    this.causaenfermedad.listaDeTipoCausa().subscribe((resp) => {
      this.ListaDeCausa = resp;
      this.ListaDeCausa.forEach((element) => {
        this.causaenfermedad.getImagen(element.urlTC).subscribe((resp) => {
          let url = URL.createObjectURL(resp);
          this.imagen = this.dm.bypassSecurityTrustUrl(url);
          element.imagen = this.imagen;
          element.archivo = this.convertirArchivo(resp, element.urlTC);
          this.dtTrigger.next(null);
        });
      });
    });
  }

  ObtenerImagen(url: string) {
    this.causaenfermedad.getImagen(url).subscribe((resp) => {
      let url = URL.createObjectURL(resp);
      this.imagen = this.dm.bypassSecurityTrustUrl(url);
    });
  }

  ObtenerCausaEliminar(causa: ITipoCausa) {
    this.ObjetoCausaEliminar.emit(causa); //para emitar el evento de objeto a la vista del padre
  }
  ObtenerCausaModificar(causa: ITipoCausa) {
    this.ObjetoCausaModificar.emit(causa);
  }
  convertirArchivo(blob: Blob | undefined, url: string): File {
    let miArchivo!: File;
    let nombre = url.substring(36);
    if (blob != undefined) {
      miArchivo = new File([blob], nombre, {
        type: blob.type,
      });
      return miArchivo;
    } else {
      return miArchivo;
    }
  }
  openModal(content: any, causas: ITipoCausa) {
    this.causa = causas;
    this.modalService.open(content, {
      size: "xl",
      centered: true,
      backdrop: "static",
      keyboard: false,
    });
  }
}
