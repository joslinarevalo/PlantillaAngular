export interface ITratamientoMostrar{
    idTratamiento?:string,
    nombrePesticidaTratamiento:string,
    descripcionTratamiento:string,
    aplicacionTratamiento:string,
    indicacionesTratamiento:string,
    tipoTratamiento:string,
    urlTratamiento:string,
    imagen?:any,
    archivo?:File
}
export interface ITratamientoDTOValid{
    idTratamiento?:string,
    nombrePesticidaTratamiento:string,
    descripcionTratamiento:string,
    aplicacionTratamiento:string,
    indicacionesTratamiento:string,
    tipoTratamiento:string,
    urlTratamiento:string
}