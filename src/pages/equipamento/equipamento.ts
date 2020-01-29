import { EquipamentoService } from './../../services/domain/equipamento.service';
import { EquipamentoDTO } from './../../models/equipamento.dto';
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
  selector: 'page-equipamento',
  templateUrl: 'equipamento.html',
})
export class EquipamentoPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items: EquipamentoDTO[];
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public equipamentoService: EquipamentoService) {
  }

  ionViewDidLoad() {
    this.equipamentoService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {});
  }

  inspecao(id: string){    
    this.navCtrl.push('InspecaoPage', {id: id});
  }

  getItems(event){

  }

}
