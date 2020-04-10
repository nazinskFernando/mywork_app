import { AcessoriosComponentesDTO } from './../../models/acessoriosComponentes.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController  } from 'ionic-angular';
import { AcessorioComponenteService } from '../../services/domain/acessorio_componente.service';

/**
 * Generated class for the NewAcessoriosComponentesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-acessorios-componentes',
  templateUrl: 'new-acessorios-componentes.html',
})
export class NewAcessoriosComponentesPage {
  
  acessorio = new AcessoriosComponentesDTO();
  inspecaoId: string;
  acessoriosId:string;

  constructor(
            public navCtrl: NavController, 
            public navParams: NavParams,
            public viewCtrl: ViewController,
            public acessoriosService: AcessorioComponenteService) {
  }
 

  ionViewDidLoad() {
    this.inspecaoId = this.navParams.get('inspecao');
    if(this.navParams.get('acessoriosId')!=''){
      this.acessoriosId = this.navParams.get('acessoriosId');
      this.carregarLingadas(); 
    }
   
  }

  carregarLingadas(){
    
    this.acessoriosService.findById(this.acessoriosId)
      .subscribe((response : AcessoriosComponentesDTO) => {        
        this.acessorio = response;         
      },
      error => {}
      );
  }
  

  inserir() {

    if(this.acessorio.id){ 
      this.update();
    } else {
              
      this.acessorio.inspecao = this.inspecaoId;
      console.log('acessorio: ', this.acessorio);
      this.acessoriosService.insert(this.acessorio).subscribe(
        response => {
          // this.navCtrl.push('LingadaPage', {id: this.lingada.inspecao});
          this.closeModal();
        },
        error => {}
      );
    }
    
  }

  update() {
    this.acessorio.id = this.acessoriosId;
    this.acessorio.inspecao = this.inspecaoId;
    
    this.acessoriosService.update(this.acessorio).subscribe(
      response => {
        // this.navCtrl.push('LingadaPage', {id: this.lingada.inspecao});
        this.closeModal();
        
      },
      error => {}
    );
  }

  closeModal(){
    this.viewCtrl.dismiss({id: this.acessorio.inspecao});
  }

}

