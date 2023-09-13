import Swal from "sweetalert2";

export function mensajeExito(mensaje:string){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
      });

}
export function mensajeError(mensaje:string){
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: mensaje,
        showConfirmButton: false,
        timer: 1500,
      });

}
