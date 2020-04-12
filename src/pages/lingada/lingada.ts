import { LingadaService } from './../../services/domain/lingada.service';
import { InspecaoService } from '../../services/domain/inspecao.service';
import { InspecaoDTO } from '../../models/inspecao.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
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
  inspecaoId: string;
  cliente =  new ClienteDTO;

  qtdLingadas:number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public lingadaService: LingadaService,
    public inspecaoService: InspecaoService,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
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
        this.qtdLingadas = this.inspecao.lingadas.length;    
      },
      error => {});
  }

  novaLingada(id){

    let criarNovaLingada = this.modalCtrl.create('NewLingadaPage',  {inspecao: this.inspecao.id, lingada: id});
    criarNovaLingada.onDidDismiss(data => {
      console.log(data);
      this.inspecaoId = data;
      this.carregarDados();
    });
    criarNovaLingada.present();
    
    // this.navCtrl.push('NewLingadaPage', {inspecao: this.inspecao.id, lingada: id});
  }

  deletarLingada(id: string){
    
    this.lingadaService.delete(id)
      .subscribe((response) => {        
        this.carregarDados();
      },
      error => {}
      );
  }
}
