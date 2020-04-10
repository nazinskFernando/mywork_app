import { StorageService } from './../../services/storage.service';
import { UsuarioDTO } from './../../models/usuario.dto';
import { Component } from '@angular/core';

/**
 * Generated class for the UsuarioComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'usuario',
  templateUrl: 'usuario.html'
})
export class UsuarioComponent {

  text: string;
  usuario: UsuarioDTO;

  constructor(public storage: StorageService) {
    this.getUser();
  }

  getUser(){
    this.usuario = this.storage.getUsuarioLocal();
  }
}
