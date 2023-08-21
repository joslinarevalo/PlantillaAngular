import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ISintoma } from '../../interfaces/ISintoma';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SintomaService } from '../../services/sintoma.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  @Input() sintomaOd!: ISintoma;
  @Input() leyenda!: string;
  @Input() titulo!: string;
  @Input() queryString: string;
  
  formBuilder!: FormGroup;
  p: any;
  card: ISintoma;
  idSintoma: string = '';

  constructor(
    private sintomaService : SintomaService, 
    private modalService: NgbModal, 
    private fb: FormBuilder, private router: Router
    ) { }


  ngOnInit(): void {
    this.formBuilder = this.iniciarFormulario();
  }

  private iniciarFormulario(): FormGroup{
    return this.fb.group({
      nombreSintoma: ['',[Validators.required]]
    })
  }

  openModal(content: any) {
    this.modalService.open(content);
  }

  guardar() {
    if (this.formBuilder.valid) {
      if (this.sintomaOd != null) {
        this.editando();
      } else {
        this.registrando();
      }
    } else {
      Swal.fire({
        position: 'center',
        title: 'Faltan datos en el formuario',
        text: 'submit disparado, formulario no valido ' + this.formBuilder.valid,
        icon: 'warning',
      });
    }
  }

  registrando() {
    const sintoma = this.formBuilder.value;
    this.sintomaService.nuevoSintoma(sintoma).subscribe((resp: any) => {
      if (resp) {
        Swal.fire({
          position: 'center',
          title: 'Buen trabajo',
          text: 'Datos guardados con exito',
          icon: 'info',
        });
        this.formBuilder.reset();
        this.recargar();
        this.modalService.dismissAll();
      }
    }, (err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo paso, hable con el administrador',
      });
    })
  }

  editando() {

    this.sintomaOd.nombreSintoma = this.formBuilder.controls['nombreSintoma'].value;
    
    this.sintomaService.editarSintoma(this.sintomaOd).subscribe((resp: any) => {
      if (resp) {
        //console.log(resp);
        Swal.fire({
          position: 'center',
          title: 'Buen trabajo',
          text: 'Datos guardados con exito',
          icon: 'info',
        });
        this.formBuilder.reset();
        this.recargar();
        this.modalService.dismissAll();
      }
    }, (err: any) => {
      //console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Algo paso, hable con el administrador',
      });
    })
  }

  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

}
