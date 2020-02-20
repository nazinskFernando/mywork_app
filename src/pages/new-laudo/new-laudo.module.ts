import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewLaudoPage } from './new-laudo';

@NgModule({
  declarations: [
    NewLaudoPage,
  ],
  imports: [
    IonicPageModule.forChild(NewLaudoPage),
  ],
})
export class NewLaudoPageModule {}
