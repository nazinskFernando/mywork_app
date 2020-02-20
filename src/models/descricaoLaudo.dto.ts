import { TipoLaudoDTO } from './tipoLaudo.dto';
export class DescricaoLaudoDTO {

    constructor(
        public id: string,
        public descricao: string,
        public tipoLaudo: TipoLaudoDTO
    ){

    }
}