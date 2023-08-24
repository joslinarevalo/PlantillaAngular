export interface ITratamientoMostrar{
    idTratamiento?:number,
    detallePlanta?:number,
    nombrePesticidaTratamiento:string,
    descripcionTratamiento:string,
    aplicacionTratamiento:string,
    indicacionesTratamiento:string,
    tipoTratamiento:string,
    urlTratamiento:string
    imagen?:any
}
export interface ITratamientoDTOValid{
    idTratamiento?:number,
    detallePlanta:number,
    nombrePesticidaTratamiento:string,
    descripcionTratamiento:string,
    aplicacionTratamiento:string,
    indicacionesTratamiento:string,
    tipoTratamiento:string,
    urlTratamiento:string
}