import { UserInterface } from "./UserInterface";

export interface TurnoInterface {
    especialidad:string;
    especialista:UserInterface;
    paciente:UserInterface;
    fecha:any;
    estado:string;
    comentario:string;
    comentarioAtencion:string;
}
