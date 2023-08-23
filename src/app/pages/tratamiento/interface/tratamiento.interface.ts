export interface ITratamientoMostrar{
    nombreTratamiento:string,
    descripcion:string,
    aplicacion:string,
    url:string,
    imagen?:any
}
export interface ITratamientoDTOValid{
    idtratamiento?:number,
    detallePlanta:number,
    nombrepesticidaTratamiento:string,
    descripcionTratamiento:string,
    aplicacionTratamiento:string,
    indicacionesTratamiento:string,
    tipoTratamiento:string,
    urlTratamiento:string
}