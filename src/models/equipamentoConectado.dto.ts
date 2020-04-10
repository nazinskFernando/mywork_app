import { InspecaoDTO } from './inspecao.dto';
import { EquipamentoDTO } from './equipamento.dto';
export class EquipamentoConectadoDTO {

    id: string;
    equipamento = new EquipamentoDTO();
    inspecao = new InspecaoDTO();   
}