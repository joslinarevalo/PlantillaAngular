import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetalleCausa, Enfermedad, TipoCausa } from '../../models/DetalleCausa';
import { DetallecausaService } from '../../services/detallecausa.service';
import Swal from 'sweetalert2';
import { NAME_VALIDATE } from 'src/app/constants/constants';

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
  @Input() titulo!: string;
  @Input() queryString: string;
  listEnfermedad: Enfermedad[] = [];
  listTipoCausa: TipoCausa[]=[];
  @Input() detalleCt!: DetalleCausa;
  detalleSeleccionado:DetalleCausa=null;
  enfermedadSeleccionada:Enfermedad=null;
  tipocasaSeleccionada:TipoCausa=null;
  private desc : string = NAME_VALIDATE;
  private enfe : string = NAME_VALIDATE;
  private tcusa : string = NAME_VALIDATE;
  formData!: FormGroup;
  constructor( private modalService: NgbModal, 
    private fb: FormBuilder, private router: Router,
    private detallecausaservice:DetallecausaService) { 
      this.formData = this.fb.group({
        // id: ['', [Validators.required]],
      
        enfermedadCausa: ["", [Validators.required, Validators.minLength(30)]],
        tipocausaD: ["", [Validators.required, Validators.minLength(30)]],
        descripcionD: ["", [Validators.required, Validators.minLength(500)]],
      });
    }

  ngOnInit() {
    this.formData = this.iniciarFormulario();
    this.obtener();
    this.obtenerTipo();
    this.loadDetalle();
   
  }
  loadDetalle() {
    if (this.detalleCt) {
      this.formData.reset({
        enfermedadCausa: this.detalleCt.enfermedad,
        tipocausaD: this.detalleCt.tipoCausa,
        descripcionD: this.detalleCt.descripcionCausa,
        
      });
    }
  }
  esCampoValido(campo: string) {
    const validarCampo = this.formData.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }
  openModal(content: any) {
    this.modalService.open(content);
  }

  
  extraLarge(exlargeModal: any) {
    this.modalService.open(exlargeModal, { size: 'xl', centered: true });
  }
  obtener() {
    this.detallecausaservice.listaenfermedad()
      .subscribe(data => {
        this.listEnfermedad = data;//
        console.log(data);
      });
  }
  obtenerTipo() {
    this.detallecausaservice.listatipocausa()
      .subscribe(data => {
        this.listTipoCausa = data;//
        console.log(data);
      });
  }
  private iniciarFormulario(): FormGroup {
    return this.fb.group({
     // bibliotequita: [this.libritos.bibliotequita!.id, [Validators.required]],
     enfermedadCausa: ['', [Validators.required, Validators.pattern(this.enfe)]],
     tipocausaD: ['', [Validators.required, Validators.pattern(this.tcusa)]],
     descripcionD: ['', [Validators.required, Validators.pattern(this.desc)]]

    })
  }
  guardar(){
    if(this.formData.valid){
      if(this.detalleSeleccionado==null){
        this.registrando();
      }else{
        this.editar();
      }
    }
    this.modalService.dismissAll();
  }
  registrando() {
    const detalle: DetalleCausa = {
      descripcionCausa: this.formData.get('descripcionD').value,
      enfermedad: {
        idenfermedad: this.formData.get('enfermedadCausa').value
      },
      tipoCausa:{
        idTipoCausa:this.formData.get('tipocausaD').value
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
        this.formData.reset();
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
  editar(){
    const descripcion= this.formData.get('descripcionD').value;
    this.detalleSeleccionado.descripcionCausa= descripcion;
    this.detalleSeleccionado.enfermedad= this.enfermedadSeleccionada;
    this.detalleSeleccionado.tipoCausa=this.tipocasaSeleccionada;
    ///
    this.detallecausaservice.actualizar(this.detalleSeleccionado).subscribe(resp=>{
      if(resp){
        Swal.fire({
          position: 'center',
          title: 'Buen trabajo',
          text: 'Datos modificados con éxito',
          icon: 'info',
        });
        this.formData.reset();
        this.recargar();
        this.modalService.dismissAll();
      }
  
    },(err: any)=>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al editar, hable con el administrador',
      });
    })
  }
  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
  enviarDato(codigo: number ){
    //enfermedadCausa
  console.log("entra");
  const enfermedadSeleccionada = this.listEnfermedad.find(enfermedad => enfermedad.idenfermedad === codigo);
  if (enfermedadSeleccionada) {
    this.enfermedadSeleccionadaNombre = enfermedadSeleccionada.nombreEnfermedad;
  }
  }

  enviarTipoCausa(codigo: number ){
  console.log("entra");
  const tipocausaSeleccionada = this.listTipoCausa.find(tipoCausa => tipoCausa.idTipoCausa === codigo);
  if (tipocausaSeleccionada) {
    this.tipoCSeleccionadaNombre = tipocausaSeleccionada.nombreCientificoTC;
  }
  }
}
