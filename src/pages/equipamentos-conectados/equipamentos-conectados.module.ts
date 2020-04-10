import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EquipamentosConectadosPage } from './equipamentos-conectados';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EquipamentosConectadosPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EquipamentosConectadosPage),
  ],
})
export class EquipamentosConectadosPageModule {}
