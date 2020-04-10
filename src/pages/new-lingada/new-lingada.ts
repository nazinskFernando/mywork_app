import { LingadaService } from './../../services/domain/lingada.service';
import { LingadaDTO } from './../../models/lingada.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController  } from 'ionic-angular';
/**
 * Generated class for the NewLingadaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-lingada',
  templateUrl: 'new-lingada.html',
})
export class NewLingadaPage {

  lingada = new LingadaDTO();
  inspecaoId: string;
  lingadaId:string;

  constructor(
            public navCtrl: NavController, 
            public navParams: NavParams,
            public viewCtrl: ViewController,
            public lingadaService: LingadaService) {
  }
 

  ionViewDidLoad() {
    this.inspecaoId = this.navParams.get('inspecao');
    if(this.navParams.get('lingada')!=''){
      this.lingadaId = this.navParams.get('lingada');
      this.carregarLingadas(); 
    }
   
  }

  carregarLingadas(){
    
    this.lingadaService.findById(this.lingadaId)
      .subscribe((response : LingadaDTO) => {        
        this.lingada = response;  
        this.lingada.dataCertificacao = new Date(this.lingada.dataCertificacao).toISOString();
       
       console.log('data ', this.lingada.dataCertificacao );
        
      },
      error => {}
      );
  }
  

  inserir() {

    if(this.lingada.id){ 
      this.update();
    } else {
              
      this.lingada.inspecao = this.inspecaoId;
    
      this.lingadaService.insert(this.lingada).subscribe(
        response => {
          // this.navCtrl.push('LingadaPage', {id: this.lingada.inspecao});
          this.closeModal();
        },
        error => {}
      );
    }
    
  }

  update() {
    this.lingada.id = this.lingadaId;
    this.lingada.inspecao = this.inspecaoId;
    
    this.lingadaService.update(this.lingada).subscribe(
      response => {
        // this.navCtrl.push('LingadaPage', {id: this.lingada.inspecao});
        this.closeModal();
        
      },
      error => {}
    );
  }

  closeModal(){
    this.viewCtrl.dismiss({id: this.lingada.inspecao});
  }

}
