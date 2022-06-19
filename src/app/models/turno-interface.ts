import { UserInterface } from "./UserInterface";

export interface TurnoInterface {
    id:string;
    especialidad:string;
    especialista:UserInterface;
    paciente:UserInterface;
    fecha:string;
    estado:string;
    comentario:string;
    comentarioAtencion:string;
}
