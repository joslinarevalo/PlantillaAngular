import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { environment } from 'src/environments/environment';
import { DatosClaveTemp, Email } from '../interfaces/Email';
import Swal from 'sweetalert2';
import { IUsuarioCorreo, IUsuarioValid } from 'src/app/pages/usuario-c/interface/usuario.interface';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  // set the currenr year
  year: number = new Date().getFullYear();

  email2: string;
  email: Email;
  datosClaveTemp: DatosClaveTemp;
  usuario: IUsuarioCorreo;
  resetForm!: FormGroup;
  showVerificationForm = false; // Variable para controlar la visibilidad del formulario de verificación
  verificationForm: FormGroup; // Formulario de verificación de código y contraseña


  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private autenticacionService: AutenticacionService) {
    this.resetForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
    });
    this.verificationForm = this.formBuilder.group({
      codigoVerificiacion: ['', Validators.required],
      nuevaClave: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.resetForm.reset();
  }

  formulario_valido(): boolean {
    let estado: boolean = false;
    if (this.resetForm.valid) {
      estado = true;
    } else {
      estado = false;
      Object.values(this.resetForm.controls).forEach((control) =>
        control.markAllAsTouched()
      );
    }
    return estado;
  }
  esCampoValido(campo: string) {
    const validarCampo = this.resetForm.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? 'is-invalid'
      : validarCampo?.touched
        ? 'is-valid'
        : '';
  }

  enviarEmail() {

    if (this.formulario_valido()) {

      // Generar un código de recuperación aleatorio
      const codigoRecuperacion = Math.floor(100000 + Math.random() * 900000).toString();

      // Obtener la hora actual
      const now = new Date();

      // Agregar 15 minutos a la hora actual
      const horaExpiracion = new Date(now.getTime() + 15 * 60000); // 15 minutos en milisegundos

      this.usuario = {
        id: "string",
        apellido: "string",
        correo: this.resetForm.controls['correo'].value,
        clave: "string",
        usuario: "string",
        estado: "string",
        nombre: "string",
        idrol: 0,
        claveTemporal: codigoRecuperacion,
        horaExpiracion: horaExpiracion + ""
      };

      //validar que el correo ingresado exista en la bd
      this.autenticacionService.buscarUserEmail(this.usuario).subscribe(
        (response) => {
          console.log(this.usuario);

          this.email = {
            destinatarios: [this.resetForm.controls['correo'].value],
            asunto: 'Recuperación de Contraseña',
            mensaje: `Su código de recuperación es: ${codigoRecuperacion}, este código es válido por 15 minutos.`
          };

          this.autenticacionService.resetPassword(this.email).subscribe(
            (response) => {
              // Lógica para manejar la respuesta del backend (puede ser una confirmación de éxito)
              console.log('Solicitud enviada con éxito');
              Swal.fire('Recuperación de Contraseña', `¡Código de recuperacion enviado con éxito!`, 'success');

              //setear el codigo de recuperacion y la fecha de expiracion
              this.autenticacionService.setClaveTemp(this.usuario).subscribe(
                (resp) => {
                  this.showVerificationForm = true;
                  console.log('Solicitud enviada con éxito');
                  Swal.fire('Recuperación de Contraseña', `¡Código de recuperacion enviado a la BD con éxito!`, 'success');
                },
                (e) => {
                  console.error('Error al enviar la solicitud A LA BD', e);
                }
              );
            },
            (error) => {
              console.error('Error al enviar la solicitud', error);
              Swal.fire('Error al enviar la solicitud', `Por favor verifique que el correo ingresado sea el correcto `, 'error');
            }
          );
        },
        (error) => {
          console.error('Error al enviar la solicitud', error);
          Swal.fire('Error al enviar la solicitud', `El correo electrónico ingresado no esta registrado en el sistema `, 'error');
        }
      );
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Error en el formulario',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  // Cuando se envía el código de verificación
  onVerifyCode() {
    // Validar el código de verificación y guardar la nueva contraseña
    if (this.formulario_valido()) {
      this.usuario = {
        id: "string",
        apellido: "string",
        correo: this.resetForm.controls['correo'].value,
        clave: "string",
        usuario: "string",
        estado: "string",
        nombre: "string",
        idrol: 0,
        claveTemporal: "string",
        horaExpiracion: "string"
      };
      const enteredCode = this.verificationForm.controls.codigoVerificiacion.value;
      const newPassword = this.verificationForm.controls.nuevaClave.value;
      console.log(this.usuario);
      // Aquí debes comparar 'enteredCode' con el código guardado en la base de datos
      this.autenticacionService.buscarUserEmail(this.usuario).subscribe(
        (response) => {
          console.log(response.mensaje);
          let obj: IUsuarioCorreo = JSON.parse(response.mensaje);
          console.log(obj);
          console.log(obj.claveTemporal);
          if (obj.claveTemporal == enteredCode) {
            // Obtener la hora actual
            const now = new Date();
            const horaActual = new Date(now.getTime()).getTime();
            const horaExpiracion = new Date(obj.horaExpiracion).getTime();

            if (horaActual <= horaExpiracion) {
              this.usuario.clave = newPassword;
              this.autenticacionService.setNuevaClave(this.usuario).subscribe(
                (response) => {
                  Swal.fire('Recuperación de Contraseña', `¡Se ha actualizado la contraseña exitosamente!`, 'success');
                  this.router.navigate(['/login']);
                },
                (error) => {
                  Swal.fire('Recuperación de Contraseña', `No se ha podido actualizar la contraseña `, 'error');
                }
              );
            } else {
              Swal.fire('Error', `!Tiempo de expiración del código superado¡  `, 'error');
            }
          } else {
            Swal.fire('Error', `Código incorrecto `, 'error');
          }
        },
        (error) => {
          Swal.fire('Error al enviar la solicitud', `Por favor verifique que el correo ingresado sea el correcto `, 'error');
        }
      );
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Error en el formulario',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

}
