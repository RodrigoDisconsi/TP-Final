import { UserInterface } from "./UserInterface";

export interface TurnoInterface {
    especialidad:string;
    especialista:UserInterface;
    paciente:UserInterface;
    fecha:string;
    estado:string;
    comentario:string;
    comentarioAtencion:string;
}
