import { AuthService } from './../../services/auth.service';
import { InspecaoService } from '../../services/domain/inspecao.service';
import { InspecaoDTO } from '../../models/inspecao.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 
  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items: InspecaoDTO[];
  

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      public inspecaoService: InspecaoService,
      public auth: AuthService
    ) {
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));        
        this.inicio();
      },
      error => {
        this.navCtrl.setRoot('LoginPage');
      });  
  }

  inicio() {
    this.inspecaoService.findAll()
      .subscribe((response : InspecaoDTO[])=> {
        this.items = response;
      },
      error => {});
  }

  Inspecao(id: string){    
    this.navCtrl.push('InspecaoPage', {id: id});
  }

  getItems(event){

  }

}
