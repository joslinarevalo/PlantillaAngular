import Swal from "sweetalert2";

export function mensajeExito(mensaje:string){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Buen trabajo!',
        text: mensaje,
        showConfirmButton: false,
        timer: 3000,
      });
      
}
export function mensajeError(mensaje:string){
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: '¡Algo anda mal!',
        text: mensaje,
        showConfirmButton: false,
        timer: 3000,
      });
      
}