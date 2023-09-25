import { IFamilia } from "../../familia/interfaces/ifamilia";
import { Itipoplanta } from "../../tipoplanta/interfaces/ITipoPlanta";

export interface IPlantaMostrar {
  nombreCientifico: string;
  descripcion:      string;
  tipoPlanta:       string;
  nombreComun:      string;
  historia:         string;
  idTipoPlanta:     string;
  nombreFamilia:    string;
  idPlanta?:         string;
  idFamilia:        string;
  urlPlanta:        string;
  imagen?:          any;
  archivo?:         File;
}

export interface IPlanta {
  nombreCientificoPlanta: string;
  descripcionPlanta:      string;
  tipoPlanta:       Itipoplanta;
  nombreComunPlanta:      string;
  historia:         string;
  idPlanta?:         string;
  familia:        IFamilia;
  urlPlanta:        string;
  imagen?:          any;
  archivo?:         File;
}


export interface IPlantaValid {
  nombreCientifico?: string;
  descripcion?:      string;
  nombreComun?:      string;
  historia?:         string;
  idTipoPlanta?:     string;
  idPlanta?:         string;
  idFamilia?:        string;
  urlPlanta?:        string;
  imagen?:          any;
  archivo?:         File;
}

export interface IBuscarPlanta {
  nombreCientificoPlanta: string;
  descripcionPlanta:      string;
  tipoPlanta:       string;
  nombreComunPlanta:      string;
  historia:         string;
  idTipoPlanta:     string;
  nombreFamilia:    string;
  idPlanta?:         string;
  idFamilia:        string;
  urlPlanta:        string;
  imagen?:          any;
  archivo?:         File;
}

