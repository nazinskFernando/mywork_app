import { ClienteDTO } from './../../models/cliente.dto';
import { LaudoDTO } from './../../models/laudo.dto';
import { EquipamentoDTO } from './../../models/equipamento.dto';
import { InspecaoDTO } from '../../models/inspecao.dto';
import { LaudoService } from './../../services/domain/laudo.service';
import { InspecaoService } from './../../services/domain/inspecao.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the LaudoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-laudo',
  templateUrl: 'laudo.html',
})
export class LaudoPage {

  inspecao = new InspecaoDTO;
  equipamento = new EquipamentoDTO;
  laudos = new Array<LaudoDTO>();
  idEquipamento: any;
  inspecaoId: string;
  cliente =  new ClienteDTO;

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public inspecaoService: InspecaoService,
              public laudoService: LaudoService,
              public modalCtrl: ModalController) {
  }
  
  ionViewDidLoad() {
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
        console.log(this.inspecao );
      },
      error => {});
  }

  detalheInspecaoByID(id?:string){
    let criarNovaLingada = this.modalCtrl.create('DetalheInspecaoPage',  {id: id, inspecaoId: this.inspecaoId});
    criarNovaLingada.onDidDismiss(data => {
      console.log(data);
      this.inspecaoId = data;
      this.carregarLaudo();
    });
    criarNovaLingada.present();
   
  }

  deletarLaudo(id: string){
    this.laudoService.delete(id).subscribe((response) => {        
        this.carregarLaudo();
      },
      error => {});
  }

  novoLaudo(){
    let criarNovaLingada = this.modalCtrl.create('NewLaudoPage',  {inspecaoId: this.inspecaoId});
    criarNovaLingada.onDidDismiss(data => {
      console.log(data);
      this.inspecaoId = data;
      this.carregarLaudo();
    });
    criarNovaLingada.present();
  }

}
