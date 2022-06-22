import { HorariosInterface } from "./horarios-interface";

export interface UserInterface {
    nombre:string;
    apellido:string;
    edad:number;
    dni:number;
    obraSocial?:string;
    horarios?:HorariosInterface[];
    especialidad?:string[];
    ultimoInicioSesion?:string;
    ultimaVezAtendido?:string;
    rol:string;
    email:string;
    password:string;
    habilitado:boolean;
    seleccionado:boolean;
    pathImg?:string;
}
