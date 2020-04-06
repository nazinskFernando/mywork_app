import { LingadaService } from './../../services/domain/lingada.service';
import { LaudoService } from './../../services/domain/laudo.service';
import { LingadaDTO } from './../../models/lingada.dto';
import { AcessoriosComponentesDTO } from './../../models/acessoriosComponentes.dto';
import { AuthService } from './../../services/auth.service';
import { InspecaoService } from '../../services/domain/inspecao.service';
import { InspecaoDTO } from '../../models/inspecao.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { LaudoDTO } from '../../models/laudo.dto';
import { EquipamentoDTO } from '../../models/equipamento.dto';
/**
 * Generated class for the LingadaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lingada',
  templateUrl: 'lingada.html',
})
export class LingadaPage {

  inspecao = new InspecaoDTO;
  equipamento = new EquipamentoDTO;
  laudos = new Array<LaudoDTO>();
  idEquipamento: any;
  inspecaoId: string;
  cliente =  new ClienteDTO;
  acessoriosComponentes = new Array<AcessoriosComponentesDTO>();
  lingadas = new Array<LingadaDTO>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public lingadaService: LingadaService,
    public inspecaoService: InspecaoService,
    public auth: AuthService) {
  }

  ionViewDidLoad() {
    this.carregarDados();
    
  }

  carregarDados(){
    this.inspecaoId = this.navParams.get('id');
    this.inspecaoService.findById(this.inspecaoId)
      .subscribe((response : InspecaoDTO) => {
        
        this.inspecao = response;
        this.equipamento = this.inspecao.equipamento;
        this.cliente = this.equipamento.cliente;
        this.laudos = this.inspecao.laudos;
        this.carregarLingadas();
      },
      error => {});
  }

  carregarLingadas(){
    this.inspecaoId = this.navParams.get('id');
    this.lingadaService.findAll(this.inspecaoId)
      .subscribe((response : LingadaDTO[]) => {        
        this.lingadas = response;
      },
      error => {}
      );
  }

  novaLingada(id){
    this.navCtrl.push('NewLingadaPage', {inspecao: this.inspecao.id, lingada: id});
  }

  deletarLingada(id: string){
    
    this.lingadaService.delete(id)
      .subscribe((response) => {        
        this.carregarLingadas();
      },
      error => {}
      );
  }
}
