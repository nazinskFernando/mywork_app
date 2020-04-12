import { ClienteDTO } from './cliente.dto';
export class EquipamentoDTO {
    id : string;
    descricao : string;
    partNumber : string;
    serialNumber : string;
    cliente : ClienteDTO;
    isInspecionado : boolean;
    contratoJuridico: string;
    contSap: string;
    tag: string;
}
