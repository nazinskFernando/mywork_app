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
  loading: boolean = false;
  page: number = 0;
  qtdPorPagina: number = 10;
  totalPages: number = 0;
  valorString: string ='';
  shouldShowCancel:boolean;

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

  refresh(refresher){
    this.page = 0;
    this.inspecaoService.findAll(this.page, this.qtdPorPagina, "id", "DESC")
    .subscribe((response : InspecaoDTO[])=> {
      this.items = response["content"];
      this.page = response["number"];
      this.totalPages = response["totalPages"];
      refresher.complete();
    },
    error => {});
  }

  getMore(infiniteScroll){
    this.page++;
    this.inspecaoService.findAll(this.page, this.qtdPorPagina, "id", "DESC")
      .subscribe((response : InspecaoDTO[])=> {
        
        response["content"].forEach(element => {
          this.items.push(element);
        });
        this.page = response["number"];
        this.totalPages = response["totalPages"];
        infiniteScroll.complete();
      },
      error => {});
    
  }
  inicio() {
    this.loading = false;
    this.inspecaoService.findAll(this.page, this.qtdPorPagina, "id", "DESC")
      .subscribe((response : InspecaoDTO[])=> {
        this.items = response["content"];
        this.page = response["number"];
        this.totalPages = response["totalPages"];
        this.loading = true;
      },
      error => {});
  }

  Inspecao(id: string){    
    this.navCtrl.push('InspecaoPage', {id: id});
  }

  getItems(event){     
    this.filtrarString();
    //   setTimeout(() => { 
    //     if(event.data != null || event.data != undefined){
    //       this.valorString = this.valorString + event.data; 
    //       this.filtrarString(); 
    //     } else {
    //       this.valorString = ''; 
    //       this.filtrarString(); 
    //     }
    // }, 100);  
  }

  onCancel(){
    this.valorString = ''; 
    this.filtrarString(); 
  }

  filtrarString(){
    this.inspecaoService.findAllString(this.page, this.qtdPorPagina, "id", "DESC", this.valorString)
      .subscribe((response : InspecaoDTO[])=> {
        this.items = response["content"];
        this.page = response["number"];
        this.totalPages = response["totalPages"];
        this.loading = true;
      },
      error => {});
  }
}
