import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleCausa, Enfermedad, TipoCausa } from '../../models/DetalleCausa';
import { DetallecausaService } from '../../services/detallecausa.service';
import Swal from 'sweetalert2';
import { CADENATEXTO, NAME_VALIDATE } from 'src/app/constants/constants';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  //@Input() sintomaOd!: ISintoma;
  @Input() leyenda!: string;
  enfermedadSeleccionadaNombre: string;
  tipoCSeleccionadaNombre: string;
  selectedEnfermedadId: number | null = null;
  selectedTipoCausaId: number | null = null;
  enfermedadSeleccionada:Enfermedad=null;
  tipocasaSeleccionada:TipoCausa=null;
  @Input() titulo!: string;
  @Input() modo: 'Registrar' | 'Editar';
  @Input() queryString: string;
  listEnfermedad: Enfermedad[] = [];
  listTipoCausa: TipoCausa[]=[];
  @Input() detalleCt!: DetalleCausa;
  detalleSeleccionado:DetalleCausa=null;
  formularioDetalleCausa!: FormGroup;
  constructor( private modalService: NgbModal, 
    private fb: FormBuilder, private router: Router,
    private detallecausaservice:DetallecausaService) { 
     this.formularioDetalleCausa= this.iniciarFormulario();
     this.detalleSeleccionado = new DetalleCausa(); // Inicialización aquí
  this.enfermedadSeleccionada = new Enfermedad(); // Inicialización aquí
  this.tipocasaSeleccionada = new TipoCausa(); // Inicialización aquí
    }

  ngOnInit() {
 
    this.obtenerenfermedad();
    this.obtenerTipo();
    this.loadDetalle();
   
  }
  private iniciarFormulario(): FormGroup{
    return this.fb.group({
      enfermedadCausa: ["", [Validators.required]],
      tipocausaD: ["", [Validators.required]],
      descripcionD: ["", [Validators.required]],
    })
   

  }

  openModal(content: any) {
    this.modalService.open(content);
  }
  extraLarge(exlargeModal: any) {
    this.modalService.open(exlargeModal, { size: 'xl', centered: true });
  }
  obtenerenfermedad() {
    this.detallecausaservice.listaenfermedad()
      .subscribe(data => {
        this.listEnfermedad = data;
        console.log("Lista de Enfermedades:", this.listEnfermedad);
      });
  }
  
  obtenerTipo() {
    this.detallecausaservice.listatipocausa()
      .subscribe(data => {
        this.listTipoCausa = data;
        console.log("Lista de Tipos de Causa:", this.listTipoCausa);
      });
  }
  enviarDato(codigo: number) {
    console.log("Enviando enfermedad con id:", codigo);
    this.selectedEnfermedadId = codigo;
    const enfermedadSeleccionada = this.listEnfermedad.find(enfermedad => enfermedad.idenfermedad === codigo);
  if (enfermedadSeleccionada) {
    this.enfermedadSeleccionadaNombre = enfermedadSeleccionada.nombreEnfermedad;
    this.enfermedadSeleccionada = enfermedadSeleccionada; // Asignación aquí
  }
  }
  
  enviarTipoCausa(codigo: number) {
    console.log("Enviando tipo de causa con id:", codigo);
    this.selectedTipoCausaId = codigo;
    const tipocausaSeleccionada = this.listTipoCausa.find(tipoCausa => tipoCausa.idtipoCausa === codigo);
    if (tipocausaSeleccionada) {
      this.tipoCSeleccionadaNombre = tipocausaSeleccionada.nombreCientificoTC;
      this.tipocasaSeleccionada = tipocausaSeleccionada; // Asignación aquí
    }
  }
  guardar() {
    console.log("Entrando en la función guardar");
    console.log("Formulario válido:", this.formularioDetalleCausa.valid);
  
      //console.log("Formulario es válido. Procediendo a guardar.");
      if (this.detalleSeleccionado !== null) {
        console.log("Registrando...");
        this.registrando();
      } else {
        console.log("Editando...");
        this.editar();
      }
    
    console.log("Cerrando modal.");
    this.modalService.dismissAll();
  }
    esCampoValido(campo: string) {
    const validarCampo = this.formularioDetalleCausa.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }

  registrando() {
   
    const detalle: DetalleCausa = {
        descripcionCausa: this.formularioDetalleCausa.get('descripcionD').value,
        enfermedad: {
          idenfermedad: this.selectedEnfermedadId
        },
        tipoCausa:{
          idtipoCausa:this.selectedTipoCausaId
        }
};
this.detallecausaservice.registrar(detalle).subscribe((resp: any) => {
  if (resp) {
     console.log(resp); 
     Swal.fire({
      position: 'center',
      title: 'Buen trabajo',
      text: 'Datos guardados con exito',
      icon: 'info',
   });
    this.formularioDetalleCausa.reset();
   this.recargar();
    this.modalService.dismissAll();
  }
  console.log("entro"); 
  console.log(resp); 
  
}, (err: any) => {
  /* console.log(err); */
   Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Algo paso, hable con el administrador',
  });
})
}
editar() {
  if (this.detalleSeleccionado !== null) {
    const descripcion = this.formularioDetalleCausa.get('descripcionD').value;
    if (this.detalleSeleccionado && this.enfermedadSeleccionada && this.tipocasaSeleccionada) {
      this.detalleSeleccionado.descripcionCausa = descripcion;
      this.detalleSeleccionado.enfermedad = {
        idenfermedad: this.enfermedadSeleccionada.idenfermedad
      };
      this.detalleSeleccionado.tipoCausa = {
        idtipoCausa: this.tipocasaSeleccionada.idtipoCausa
      };

      this.detallecausaservice.actualizar(this.detalleSeleccionado).subscribe(resp => {
        if (resp) {
          Swal.fire({
            position: 'center',
            title: 'Buen trabajo',
            text: 'Datos modificados con éxito',
            icon: 'info',
          });
          this.formularioDetalleCausa.reset();
          this.recargar();
          this.modalService.dismissAll();
        }
      }, (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al editar, hable con el administrador',
        });
      });
    }
  }
}

  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
  loadDetalle() {
    if (this.detalleCt) {
      this.formularioDetalleCausa.reset({
        enfermedadCausa: this.detalleCt.enfermedad,
        tipocausaD: this.detalleCt.tipoCausa,
        descripcionD: this.detalleCt.descripcionCausa,
        
      });
    }
  }
}

