import { UserInterface } from "./UserInterface";

export interface TurnoInterface {
    especialidad:string;
    especialista:UserInterface;
    paciente:UserInterface;
    fecha:Date;
    estado:string;
}
