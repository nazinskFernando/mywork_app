import { StorageService } from './../../services/storage.service';
import { LingadaDTO } from './../../models/lingada.dto';
import { AcessoriosComponentesDTO } from './../../models/acessoriosComponentes.dto';
import { InspecaoService } from '../../services/domain/inspecao.service';
import { InspecaoDTO } from '../../models/inspecao.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { LaudoDTO } from '../../models/laudo.dto';
import { EquipamentoDTO } from '../../models/equipamento.dto';
import { AlertController } from 'ionic-angular';

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
      public storage: StorageService,
      public alertCtrl: AlertController,      
      public modalCtrl: ModalController
    ) {
  }

  ionViewDidEnter() {
    this.carregarLaudo();  
  }

  popUpInterromper() {
    const prompt = this.alertCtrl.create({
      title: "Interromper Inspeção?",
      message: "Informe o motivo da Interrupção",
      inputs: [
        {
          name: 'Observação:',
          placeholder: 'Informe a observação'
        },
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            this.alterarStatus(data, '3');
                      
          }
        }
      ]
    });
    prompt.present();
  }

  popFinalizacao(){
    let criarNovaLingada = this.modalCtrl.create('PopupPage', {id: this.inspecao.id});
    criarNovaLingada.onDidDismiss(data => {
      console.log(data);
      this.inspecao.observacao = data.comentario;
      this.inspecao.estadoEquipamento = data.estado;      
    });
    criarNovaLingada.present();
}

  

  popRetornoInterrupcao() {
    const prompt = this.alertCtrl.create({
      title: `Realizar Inspeção?`,
      message: "Informe o motivo da Interrupção",
      inputs: [
        {
          name: 'Observação:',
          placeholder: 'Informe a observação'
        },
      ],
      buttons: [
        {
          text: 'Não',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: data => {            
           this.alterarStatus(data, '1');                     
          }
        }
      ]
    });
    prompt.present();
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
      if(this.inspecao.statusInspecao == "PENDENTE"){
        this.alterarStatus(null, '1');
      }
    }

    this.qtdLingada.valor = this.inspecao.lingadas.length;
    if(this.qtdLingada.valor !=0){
      this.qtdLingada.color = "secondary";
      if(this.inspecao.statusInspecao == "PENDENTE"){
        this.alterarStatus(null, '1');
      }
    }

    this.qtdAcessoriosComponentes.valor = this.inspecao.acessoriosComponentes.length;
    if(this.qtdAcessoriosComponentes.valor !=0){
      this.qtdAcessoriosComponentes.color = "secondary";
      if(this.inspecao.statusInspecao == "PENDENTE"){
        this.alterarStatus(null, '1');
      }
    }

    this.qtdEquipamentosConectados.valor = this.inspecao.equipamentosConectados.length;
    if(this.qtdEquipamentosConectados.valor !=0){
      
      this.qtdEquipamentosConectados.color = "secondary";
      if(this.inspecao.statusInspecao == "PENDENTE"){
        this.alterarStatus(null, '1');
      }
    }
  }

  goLink(tela: string){

    switch(tela){
      case "laudo":
        this.navCtrl.push('LaudoPage', {id: this.inspecao.id});
      break;
      case "lingada":
        this.navCtrl.push('LingadaPage', {id: this.inspecao.id});
      break;
      case "acessorios":
        this.navCtrl.push('AcessoriosComponentesPage', {id: this.inspecao.id});
      break;
      case "equipamentos":
        this.navCtrl.push('EquipamentosConectadosPage', {id: this.inspecao.id});
      break;     

    }
  }
  alterarStatus(observacao, status){
    var inspecaoUpdate = new InspecaoDTO();
   
    this.inspecao.observacao = observacao;
    inspecaoUpdate.id = this.inspecaoId;
    inspecaoUpdate.statusInspecao = status;
    inspecaoUpdate.usuario.id = this.storage.getUsuarioLocal().id;

    this.inspecaoService.update(inspecaoUpdate)
      .subscribe((response) => {
        this.carregarLaudo();
      },
      error => {});
  }

}
