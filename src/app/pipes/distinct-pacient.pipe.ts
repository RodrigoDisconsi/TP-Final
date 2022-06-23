import { Pipe, PipeTransform } from '@angular/core';
import { TurnoInterface } from '../models/turno-interface';
import { UserInterface } from '../models/UserInterface';

@Pipe({
  name: 'distinctPacient'
})
export class DistinctPacientPipe implements PipeTransform {

  transform(value: TurnoInterface[]): UserInterface[] {
    if(value){
      let listPacient:UserInterface[] = value.map(turno => turno.paciente);
      return listPacient.filter((pacient, index) => 
        listPacient.findIndex(pac => pac.email == pacient.email) == index
      );
    }
    return [];
  }

}
