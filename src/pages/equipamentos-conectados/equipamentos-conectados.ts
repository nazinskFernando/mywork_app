
import { AuthService } from './../../services/auth.service';
import { InspecaoService } from '../../services/domain/inspecao.service';
import { InspecaoDTO } from '../../models/inspecao.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { EquipamentoDTO } from '../../models/equipamento.dto';
import { AcessorioComponenteService } from '../../services/domain/acessorio_componente.service';
import { EquipamentoConectadoService } from '../../services/domain/equipamentoConectado.service';

/**
 * Generated class for the EquipamentosConectadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equipamentos-conectados',
  templateUrl: 'equipamentos-conectados.html',
})
export class EquipamentosConectadosPage {

  inspecao = new InspecaoDTO;
  equipamento = new EquipamentoDTO;
  inspecaoId: string;
  cliente =  new ClienteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public equipamentoConectadoService: EquipamentoConectadoService,
    public inspecaoService: InspecaoService,
    public modalCtrl: ModalController
    ) {
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
      },
      error => {});
  }

  novoAcessorio(id){

    let criarNovaLingada = this.modalCtrl.create('NewEquipamentosConectadosPage',  {inspecao: this.inspecao.id, equipamentoConectadoId: id});
    criarNovaLingada.onDidDismiss(data => {
      console.log(data);
      this.inspecaoId = data;
      this.carregarDados();
    });
    criarNovaLingada.present();
  }

  deletarLingada(id: string){
    
    this.equipamentoConectadoService.delete(id)
      .subscribe((response) => {        
        this.carregarDados();
      },
      error => {}
      );
  }
}
