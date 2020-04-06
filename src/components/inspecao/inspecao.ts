
import { AuthService } from './../../services/auth.service';
import { InspecaoService } from '../../services/domain/inspecao.service';
import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { LaudoDTO } from '../../models/laudo.dto';
import { EquipamentoDTO } from '../../models/equipamento.dto';
import { InspecaoDTO } from '../../models/inspecao.dto';
/**
 * Generated class for the InspecaoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'inspecao',
  templateUrl: 'inspecao.html'
})
export class InspecaoComponent{

  @Input()  inspecao: InspecaoDTO;
  @Input()  equipamento: EquipamentoDTO;
  @Input()  cliente =  new ClienteDTO;

  laudos = new Array<LaudoDTO>();
  
  texto: string;
  mostrar: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public inspecaoService: InspecaoService,
    public auth: AuthService
  ) {   
}

}
