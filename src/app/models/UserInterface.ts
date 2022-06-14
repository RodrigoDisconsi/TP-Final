export interface UserInterface {
    nombre:string;
    apellido:string;
    edad:number;
    dni:number;
    obraSocial?:string;
    especialidad?:string[];
    rol:string;
    email:string;
    password:string;
    habilitado:boolean;
    seleccionado:boolean;
    pathImg?:string;
    pathImg2?:string;
}
