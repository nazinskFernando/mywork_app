import { NotaFiscalDTO } from './notaFiscal.dto';
import { EquipamentoDTO } from './equipamento.dto';
import { LaudoDTO } from './laudo.dto';
export class InspecaoDTO {

    id: string;
    descricao: string;
    partNumber: string;
    numeroSerie: string;
    laudos: LaudoDTO[]; 
    equipamento: EquipamentoDTO;
    notaFiscal: NotaFiscalDTO;
}