import { NotaFiscalDTO } from './notaFiscal.dto';
import { EquipamentoDTO } from './equipamento.dto';
import { LaudoDTO } from './laudo.dto';
import { LingadaDTO } from './lingada.dto';
import { AcessoriosComponentesDTO } from './acessoriosComponentes.dto';
export class InspecaoDTO {

    id: string;
    descricao: string;
    partNumber: string;
    numeroSerie: string;
    laudos: LaudoDTO[]; 
    equipamento: EquipamentoDTO;
    notaFiscal: NotaFiscalDTO;
    acessoriosComponentes: AcessoriosComponentesDTO[];
    lingadas: LingadaDTO[];
}