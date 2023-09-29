import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-formularioUser',
  templateUrl: './formularioUser.component.html',
  styleUrls: ['./formularioUser.component.scss']
})
export class FormularioUserComponent implements OnInit {

  @Input() ModalService!:NgbModal;
  @Input()formularioUsuario!:FormGroup;
  formularioSerealizable= new FormData();
  @Output()ObjetoGuardar= new EventEmitter<FormData>();
  @Output()ObjetoModificar= new EventEmitter<FormData>();
  @Input()leyenda:string;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }
  cerrarModal(){
    this.ModalService.dismissAll();
  }
  guardar(){}
  modificar() {}
  formulario_valido(): boolean {
    let estado: boolean = false;
    if (this.formularioUsuario.valid) {
      estado = true;
    } else {
      estado = false;
      Object.values(this.formularioUsuario.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
    return estado;
  }
  esCampoValido(campo: string) {
    const validarCampo = this.formularioUsuario.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? 'is-invalid'
      : validarCampo?.touched
      ? 'is-valid'
      : '';
  }

}
