import { EquipamentoDTO } from './../../models/equipamento.dto';
import { InspecaoDTO } from './../../models/inspecao.dto';
import { InspecaoService } from './../../services/domain/inspecao.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController  } from 'ionic-angular';
import { EquipamentoService } from '../../services/domain/equipamento.service';
import { EquipamentoConectadoDTO } from '../../models/equipamentoConectado.dto';
import { EquipamentoConectadoService } from '../../services/domain/equipamentoConectado.service';

/**
 * Generated class for the NewEquipamentosConectadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-equipamentos-conectados',
  templateUrl: 'new-equipamentos-conectados.html',
})
export class NewEquipamentosConectadosPage {
  inspecao = new InspecaoDTO();
  inspecaoId: string;
  equipamentoConectadoId:string;
  equipamento = new EquipamentoDTO();
  equipamentos: EquipamentoDTO[];
  equipamentoConectado = new EquipamentoConectadoDTO();
  isEquipamento:boolean = true;

  equipamentoSelecionado:string;

  partNumber:any;
  serialNumber:any;

  constructor(
            public navCtrl: NavController, 
            public navParams: NavParams,
            public viewCtrl: ViewController,
            public inspecaoService: InspecaoService,
            public equipamentoConectadoService: EquipamentoConectadoService,
            public equipamentoService: EquipamentoService) {
              
  }
 

  ionViewDidLoad() {
    this.inspecaoId = this.navParams.get('inspecao');
    if(this.navParams.get('equipamentoConectadoId')!=''){
      this.equipamentoConectadoId = this.navParams.get('equipamentoConectadoId');
      // this.carregarInspecao(); 
    }
  }

  getPartNumber(ev: any) {
   this.partNumber = ev.target.value;
   this.carregarEquipamentosPesquisado();  
  }

  getSerialNumber(ev: any) {
    this.serialNumber = ev.target.value;
    this.carregarEquipamentosPesquisado();  
   }

  carregarEquipamentosPesquisado(){
    
    if(this.partNumber=="" || this.partNumber == null){
      this.partNumber = "vazio";
    }

    if(this.serialNumber=="" || this.serialNumber == null){
      this.serialNumber = "vazio";
    }

      this.equipamentoService.findByEquipamentos(this.partNumber, this.serialNumber)
      .subscribe((response : EquipamentoDTO[]) => {        
        this.equipamentos = response; 
        if( this.equipamentos.length == 0){
          this.isEquipamento = false;          
        } else {
          this.isEquipamento = true;
        }      
      },
      error => {}
      );    
    
  }  

  inserir() {
    if(!this.isEquipamento){
        this.InserirEquipamento();
    } else {    
      this.equipamentoConectado.equipamento.id = this.equipamentoSelecionado;
      this.equipamentoConectado.inspecao.id = this.inspecaoId;
      
      this.equipamentoConectadoService.insert(this.equipamentoConectado).subscribe(
        response => {       
          this.closeModal();        
        },
        error => {}
      );
    }
  }

  InserirEquipamento(){
    
    this.equipamentoConectado.equipamento = this.equipamento;
    this.equipamentoConectado.inspecao.id = this.inspecaoId;
    
    this.equipamentoConectadoService.insert(this.equipamentoConectado).subscribe(
      response => {       
        this.closeModal();        
      },
      error => {}
    );
  }

  closeModal(){
    this.viewCtrl.dismiss({id: this.inspecaoId});
  }

}

