import { LaudoDTO } from './../../models/laudo.dto';
import { EquipamentoDTO } from './../../models/equipamento.dto';
import { InspecaoDTO } from '../../models/inspecao.dto';
import { LaudoService } from './../../services/domain/laudo.service';
import { InspecaoService } from './../../services/domain/inspecao.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public inspecaoService: InspecaoService,
              public laudoService: LaudoService) {
  }
  
  ionViewDidLoad() {
    this.inspecaoId = this.navParams.get('id');
    this.inspecaoService.findById(this.inspecaoId)
      .subscribe((response : InspecaoDTO) => {
        
        this.inspecao = response;
        this.equipamento = this.inspecao.equipamento;
        this.laudos = this.inspecao.laudos;
        console.log(this.inspecao );
      },
      error => {});
  }

  detalheInspecaoByID(id?:string){
    if(id){
      this.navCtrl.push('DetalheInspecaoPage', {id: id, inspecaoId: this.inspecaoId});
    } else {
      this.navCtrl.push('DetalheInspecaoPage',{inspecaoId: this.inspecaoId});
    }
  }

}
