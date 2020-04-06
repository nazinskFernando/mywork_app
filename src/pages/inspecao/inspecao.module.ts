import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspecaoPage } from './inspecao';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    InspecaoPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(InspecaoPage),
  ],
})
export class EquipamentoPageModule {}
