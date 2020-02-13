import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaudoPage } from './laudo';

@NgModule({
  declarations: [
    LaudoPage,
  ],
  imports: [
    IonicPageModule.forChild(LaudoPage),
  ],
})
export class LaudoPageModule {}
