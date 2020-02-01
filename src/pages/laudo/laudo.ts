import { LaudoService } from '../../services/domain/laudo.service';
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

  equipamento: InspecaoDTO;
  idEquipamento: string;

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public inspecaoService: LaudoService) {
    this.idEquipamento = navParams.get("id");
    console.log("Inspecao " + this.idEquipamento);
  }

  ionViewDidLoad() {
    this.onLoadEquipamento();
    console.log('ionViewDidLoad InspecaoPage');
  }

  onLoadEquipamento(){
    this.inspecaoService.findById(this.idEquipamento)
      .subscribe((response: InspecaoDTO)=> {
        this.equipamento = response;
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
