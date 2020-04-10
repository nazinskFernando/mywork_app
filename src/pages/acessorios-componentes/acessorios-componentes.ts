
import { AuthService } from './../../services/auth.service';
import { InspecaoService } from '../../services/domain/inspecao.service';
import { InspecaoDTO } from '../../models/inspecao.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { EquipamentoDTO } from '../../models/equipamento.dto';
import { AcessorioComponenteService } from '../../services/domain/acessorio_componente.service';

/**
 * Generated class for the AcessoriosComponentesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acessorios-componentes',
  templateUrl: 'acessorios-componentes.html',
})
export class AcessoriosComponentesPage {

 
  inspecao = new InspecaoDTO;
  equipamento = new EquipamentoDTO;
  inspecaoId: string;
  cliente =  new ClienteDTO;

  qtdAcessorios:number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public acessorioService: AcessorioComponenteService,
    public inspecaoService: InspecaoService,
    public auth: AuthService,
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
        this.qtdAcessorios = this.inspecao.acessoriosComponentes.length;    
      },
      error => {});
  }

  novoAcessorio(id){

    let criarNovaLingada = this.modalCtrl.create('NewAcessoriosComponentesPage',  {inspecao: this.inspecao.id, acessoriosId: id});
    criarNovaLingada.onDidDismiss(data => {
      console.log(data);
      this.inspecaoId = data;
      this.carregarDados();
    });
    criarNovaLingada.present();
  }

  deletarLingada(id: string){
    
    this.acessorioService.delete(id)
      .subscribe((response) => {        
        this.carregarDados();
      },
      error => {}
      );
  }
}
