import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaudoPage } from './laudo';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LaudoPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(LaudoPage),
  ],
})
export class LaudoPageModule {}
