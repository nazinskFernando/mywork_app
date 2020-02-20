import { DescricaoLaudoDTO } from "./descricaoLaudo.dto";
import { EquipamentoDTO } from "./equipamento.dto";

export class TipoLaudoDTO {

    constructor(
        public id: string,
        public descricao: string,
        public equipamento?: EquipamentoDTO
    ){

    }
}