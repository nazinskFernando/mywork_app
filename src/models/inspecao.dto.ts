import { NotaFiscalDTO } from './notaFiscal.dto';
import { EquipamentoDTO } from './equipamento.dto';
import { LaudoDTO } from './laudo.dto';
export interface InspecaoDTO {

    id?: string;
    descricao: string;
    partNumber: string;
    numeroSerie: string;
    laudo: LaudoDTO; 
    equipamento: EquipamentoDTO;
    notaFiscal: NotaFiscalDTO;
}