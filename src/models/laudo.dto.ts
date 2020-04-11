import { EquipamentoDTO } from './equipamento.dto';
import { TipoLaudoDTO } from './tipoLaudo.dto';
import { DescricaoLaudoDTO } from './descricaoLaudo.dto';
export class LaudoDTO {

    constructor(
        public id: string,
        public imagem: any,        
        public usarRelatorio: boolean,
        public comDesvio: boolean,
        public inspecao: string,
        public equipamento?: string,
        public descricaoLaudo?: DescricaoLaudoDTO,
    ){

    }
}