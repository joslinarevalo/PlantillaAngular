export class Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  usuario: string;
  clave: string;
  estado: string;
  roles: string[] = []; // Asumiendo que Role es otra entidad similar
}
