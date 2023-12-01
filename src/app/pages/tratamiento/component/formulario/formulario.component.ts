import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITratamientoDTOValid } from '../../interface/tratamiento.interface';
import { TratamientoService } from '../../service/service.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  //recibe un parametro del padre
  @Input() ModalService!:NgbModal;
  tratamiento!:ITratamientoDTOValid;
  @Input()formularioTratamiento!:FormGroup;
  imagenMostrar!:any;
  formularioSerealizable= new FormData();
  @Output()ObjetoGuardar= new EventEmitter<FormData>();
  @Output()ObjetoModificar= new EventEmitter<FormData>();
  @Input()leyenda:string;
  @Input() imagen:any;
  @Input() archivo: File;
  contador: number = 0;
  porcentajeCompletado: number = 0;
  longitudesDeCampos: any = {};
  mensaje: { [key: string]: string } = {};
  constructor( private fb: FormBuilder, private serviceTratamiento:TratamientoService, private dm:DomSanitizer) { }

  ngOnInit(): void {
    this.obtenerLongitudesCampos();
    if(this.leyenda=="Modificar"){
      this.imagenMostrar=this.imagen;
      this.formularioSerealizable.set('imagen',this.archivo);

    }
    else{
      this.convertirImagen();
      this.formularioTratamiento.controls['urlTratamiento'].setValue('No_imagen.jpg');
    }

  }
  cerrarModal(){
    this.ModalService.dismissAll();
  }


  guardar() {
    if (this.formulario_valido()) {
      this.tratamiento = {
        nombrePesticidaTratamiento: this.formularioTratamiento.controls['nombrePesticidaTratamiento'].value,
        descripcionTratamiento:this.formularioTratamiento.controls['descripcionTratamiento'].value,
        aplicacionTratamiento:this.formularioTratamiento.controls['aplicacionTratamiento'].value,
        indicacionesTratamiento:this.formularioTratamiento.controls['indicacionesTratamiento'].value,
        tipoTratamiento:this.formularioTratamiento.controls['tipoTratamiento'].value,
        urlTratamiento:this.formularioTratamiento.controls['urlTratamiento'].value,
      };
      this.formularioSerealizable.set("tratamiento",JSON.stringify(this.tratamiento));
      this.ObjetoGuardar.emit(this.formularioSerealizable);
      }else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'error en el formulario',
          showConfirmButton: false,
          timer: 1500,
        });
      }


  }
  modificar() {
    if (this.formulario_valido()) {
      this.tratamiento = {
        idTratamiento:this.formularioTratamiento.controls['idTratamiento'].value,
        nombrePesticidaTratamiento: this.formularioTratamiento.controls['nombrePesticidaTratamiento'].value,
        descripcionTratamiento:this.formularioTratamiento.controls['descripcionTratamiento'].value,
        aplicacionTratamiento:this.formularioTratamiento.controls['aplicacionTratamiento'].value,
        indicacionesTratamiento:this.formularioTratamiento.controls['indicacionesTratamiento'].value,
        tipoTratamiento:this.formularioTratamiento.controls['tipoTratamiento'].value,
        urlTratamiento:this.formularioTratamiento.controls['urlTratamiento'].value,
      };
      this.formularioSerealizable.set("tratamiento",JSON.stringify(this.tratamiento));
      this.ObjetoModificar.emit(this.formularioSerealizable);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'error en el formulario',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  formulario_valido(): boolean {
    let estado: boolean = false;
    if (this.formularioTratamiento.valid) {
      estado = true;
    } else {
      estado = false;
      Object.values(this.formularioTratamiento.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
    return estado;
  }
  SeleccionarImagen(event: any) {
    let file: File = event.target.files[0];
    if (file.size > 350000) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "La imagen excede el tamaño de pixeles.",
        showConfirmButton: false,
        timer: 2000,
      });
      event.target.value = null;
      return;
    }
    let lector = new FileReader();
    lector.readAsDataURL(event.target.files[0]);
    lector.onload = () => {
      this.imagenMostrar = lector.result;
    };
    this.formularioSerealizable.set("imagen", file);
  }
  esCampoValido(campo: string) {
    const validarCampo = this.formularioTratamiento.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? 'is-invalid'
      : validarCampo?.touched
      ? 'is-valid'
      : '';
  }
  convertirImagen() {
    const imagenPath = 'assets/images/NoImage.png';

   fetch(imagenPath)
    .then((response) => response.blob())
    .then((blob) => {
    const nombreArchivo = 'No_imagen.jpg';
    const archivo = new File([blob], nombreArchivo, { type: 'image/jpeg' });
    this.formularioSerealizable.set('imagen',archivo);
    });
    }
    contarCaracteres(idInput:String) {
      const textarea = document.getElementById(""+idInput) as HTMLTextAreaElement;
      let limiteCaracteres = 0;

      if (this.longitudesDeCampos.hasOwnProperty(idInput+"")) {
        limiteCaracteres = this.longitudesDeCampos[idInput+""];
      }

      this.contador = textarea.value.length;
      if(this.contador > limiteCaracteres){
        this.contador = textarea.value.length-1;
      }

      if (this.contador >= limiteCaracteres) {
        textarea.value = textarea.value.substring(0, limiteCaracteres);
        this.mensaje[idInput+""] = `Se ha alcanzado el límite de caracteres permitidos`;
      }else{
        this.mensaje[idInput+""] = `${this.contador} caracteres de ${limiteCaracteres} permitidos`;
      }
    }

    obtenerLongitudesCampos() {
      this.serviceTratamiento.longitudCampos().subscribe((lista) => {
        this.longitudesDeCampos = lista;
      });
    }
    capitalizeFirstLetter(input: string): string {
      if (input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
      } else {
        return input;
      }
    }

}
