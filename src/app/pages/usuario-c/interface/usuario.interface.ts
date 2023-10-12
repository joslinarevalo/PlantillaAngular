export interface IUsuarioValid {
  id?: string;
  apellido: string;
  correo: string;
  clave: string;
  usuario: string;
  estado: string;
  nombre: string;
  idrol: number;
}
export interface IUsuarioCorreo {
  id?: string;
  apellido: string;
  correo: string;
  clave: string;
  usuario: string;
  estado: string;
  nombre: string;
  idrol: number;
  claveTemporal?: string;
  horaExpiracion?: string;
}
export interface IUsuarioMostrar {
  rol: string,
  nombre: string,
  correo: string,
  id: string,
  apellido: string,
  idrol: number,
  usuario: string,
  estado: string,
  clave: string
}
export interface IRoles {
  id: number;
  rol?: string;
}

