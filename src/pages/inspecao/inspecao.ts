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
 * Generated class for the EquipamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inspecao',
  templateUrl: 'inspecao.html',
})
export class InspecaoPage {

  inspecao = new InspecaoDTO;
  equipamento = new EquipamentoDTO;
  laudos = new Array<LaudoDTO>();
  idEquipamento: any;
  inspecaoId: string;
  cliente =  new ClienteDTO;
  acessoriosComponentes = new Array<AcessoriosComponentesDTO>();
  lingadas = new Array<LingadaDTO>();
  
  qtdLaudos = {"color": "danger", "valor": 0};
  qtdLingada = {"color": "danger", "valor": 0};
  qtdAcessoriosComponentes = {"color": "danger", "valor": 0};
  qtdEquipamentosConectados = {"color": "danger", "valor": 0};

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public inspecaoService: InspecaoService,
      public auth: AuthService
    ) {
  }

  ionViewDidEnter() {
    this.carregarLaudo();
  }

  carregarLaudo(){
    this.inspecaoId = this.navParams.get('id');
    this.inspecaoService.findById(this.inspecaoId)
      .subscribe((response : InspecaoDTO) => {
        
        this.inspecao = response;
        this.equipamento = this.inspecao.equipamento;
        this.cliente = this.equipamento.cliente;
        this.laudos = this.inspecao.laudos;
        this.carregarQtds();
      },
      error => {});
  }

  carregarQtds(){
    this.qtdLaudos.valor = this.inspecao.laudos.length;
    if(this.qtdLaudos.valor !=0){
      this.qtdLaudos.color = "secondary";
    }

    this.qtdLingada.valor = this.inspecao.lingadas.length;
    if(this.qtdLingada.valor !=0){
      this.qtdLingada.color = "secondary";
    }

    this.qtdAcessoriosComponentes.valor = this.inspecao.acessoriosComponentes.length;
    if(this.qtdAcessoriosComponentes.valor !=0){
      this.qtdAcessoriosComponentes.color = "secondary";
    }

    // this.qtdEquipamentosConectados.valor = this.inspecao.qtdEquipamentosConectados.length;
    // if(this.qtdEquipamentosConectados.valor !=0){
    //   this.qtdEquipamentosConectados.color = "secondary";
    // }
  }

  goLink(tela: string){

    switch(tela){
      case "laudo":
        this.navCtrl.push('LaudoPage', {id: this.inspecao.id});
      break;
      case "lingada":
        this.navCtrl.push('LingadaPage', {id: this.inspecao.id});
      break;

    }
  }


}
