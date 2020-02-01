import { EquipamentoDTO } from './../../models/equipamento.dto';
import { LaudoService } from './../../services/domain/laudo.service';
import { InspecaoService } from './../../services/domain/inspecao.service';
import { InspecaoDTO } from '../../models/inspecao.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InspecaoPage page.
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

  inspecao: InspecaoDTO;
  equipamento: EquipamentoDTO;
  idEquipamento: string;

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public inspecaoService: InspecaoService,
              public laudoService: LaudoService) {
    this.idEquipamento = navParams.get("id");
  }
 
  ionViewDidLoad(){
    this.inspecaoService.findById(this.idEquipamento)
      .subscribe((response: InspecaoDTO) => {
        this.inspecao = response;
      },
      error => {});
  }

  detalheInspecao(){
    this.navCtrl.push('DetalheInspecaoPage');
  }

  detalheInspecaoByID(){
    this.navCtrl.push('DetalheInspecaoPage');
  }

}
