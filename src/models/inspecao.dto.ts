import { UsuarioDTO } from './usuario.dto';
import { NotaFiscalDTO } from './notaFiscal.dto';
import { EquipamentoDTO } from './equipamento.dto';
import { LaudoDTO } from './laudo.dto';
import { LingadaDTO } from './lingada.dto';
import { AcessoriosComponentesDTO } from './acessoriosComponentes.dto';
import { EquipamentoConectadoDTO } from './equipamentoConectado.dto';
export class InspecaoDTO {

    id: string;
    descricao: string;
    partNumber: string;
    numeroSerie: string;
    statusInspecao: string;
    statusInspecaoDescricao:string;
    estadoEquipamento:string;
    usuario = new UsuarioDTO();
    laudos: LaudoDTO[]; 
    equipamento: EquipamentoDTO;
    equipamentosConectados: EquipamentoConectadoDTO[];
    notaFiscal: NotaFiscalDTO;
    acessoriosComponentes: AcessoriosComponentesDTO[];
    lingadas: LingadaDTO[];
    observacao: string;
}