import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspecaoPage } from './inspecao';

@NgModule({
  declarations: [
    InspecaoPage,
  ],
  imports: [
    IonicPageModule.forChild(InspecaoPage),
  ],
})
export class InspecaoPageModule {}
