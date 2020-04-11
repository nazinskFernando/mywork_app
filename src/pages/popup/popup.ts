import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import { InspecaoService } from '../../services/domain/inspecao.service';
import { InspecaoDTO } from '../../models/inspecao.dto';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the PopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popup',
  templateUrl: 'popup.html',
})
export class PopupPage {
  input = {"estado": "", "comentario": ""};
  inspecaoId: any;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl:ViewController,
    public renderer: Renderer,  
    public navParams: NavParams,
    public storage: StorageService,
    public inspecaoService: InspecaoService) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
  }

  ionViewDidLoad() {
    this.inspecaoId = this.navParams.get('id');
  }
 
  finalizar(){    
      var inspecaoUpdate = new InspecaoDTO();   
      
      inspecaoUpdate.id = this.inspecaoId;
      inspecaoUpdate.observacao = this.input.comentario;
      inspecaoUpdate.estadoEquipamento = this.input.estado;
      inspecaoUpdate.statusInspecao = '2';
      inspecaoUpdate.usuario.id = this.storage.getUsuarioLocal().id;
  
      this.inspecaoService.update(inspecaoUpdate)
        .subscribe((response) => {
          this.fechar();
        },
        error => {});       
  }

  fechar(){
    this.viewCtrl.dismiss({id: this.inspecaoId});
  }
}
