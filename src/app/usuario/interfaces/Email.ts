
export interface Email { 
    destinatarios: string[];
    asunto: string;
    mensaje: string;
}

export interface DatosClaveTemp{
    correo: string;
    claveTemp: string;
    horaExp: Date;
}