import { InspecaoService } from '../../services/domain/inspecao.service';
import { InspecaoDTO } from '../../models/inspecao.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

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

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items: InspecaoDTO[];
  

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public inspecaoService: InspecaoService
    ) {
  }

  ionViewDidLoad() {
    this.inspecaoService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {});
  }

  laudo(id: string){    
    this.navCtrl.push('LaudoPage', {id: id});
  }

  getItems(event){

  }

}
