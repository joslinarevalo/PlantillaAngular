import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUsuarioMostrar, IUsuarioValid } from 'src/app/pages/usuario-c/interface/usuario.interface';
import { UsuarioServiceService } from 'src/app/pages/usuario-c/service/usuario-service.service';
import { AutenticacionService } from 'src/app/usuario/services/autenticacion.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {


  usuarios:IUsuarioMostrar;
  ident:IUsuarioMostrar;
  constructor(private modalService: NgbModal, private usuarioService:UsuarioServiceService,
    public autenticacionService: AutenticacionService) { }

  ngOnInit() {
    this.obtenerussuario();
  }

  cerrarModal(){
    this.modalService.dismissAll();
  }


  obtenerussuario(){
    if(this.ident == null){
      let user = this.autenticacionService.usuario.usuario
      this.usuarioService.buscarUsuarioU(user).subscribe(
        (data) => {
          this.ident = data;
        },
        (error) => {
        });
    }else{

    }
  }

}
