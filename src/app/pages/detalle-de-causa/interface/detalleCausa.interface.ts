export interface IDetalleCausaDTOMostrar {
  idDetalleCausa: string;
  idEnfermedad: string;
  idTipo: string;
  idPlanta: string;
  descripcionCausa: string;
}
export interface IDetalleCausaDTOValid {
  idDetalleCausa?: string;
  idEnfermedad: string;
  idTipo: string;
  idPlanta: string;
  descripcionCausa: string;
}
export interface IPlanta {
  nombreCientifico: string;
  descripcionPlanta: string;
  tipoPlanta: string;
  nombreComunPlanta: string;
  historia: string;
  idTipoPlanta: string;
  nombreFamilia: string;
  idPlanta: string;
  idFamilia: string;
  urlPlanta: string;
}
export interface IEnfermedad {
  idEnfermedad: number;
  nombreComunEnfermedad: string;
  nombreCientificoEnfermedad: string;
  descripcionEnfermedad: string;
  etapaEnfermedad: string;
  tipoEnfermedad: string;
  sintomasEnfermedad: string;
  condicionFavorableEnfermedad: string;
  partesAfectadasEnfermedad: string;
  urlEnfermedad: string;
}
export class ITipoCausa {
  idTipoCausa: string;
  tipoTC: string;
  definicionTipoTC: string;
  urlTC: string;
}
