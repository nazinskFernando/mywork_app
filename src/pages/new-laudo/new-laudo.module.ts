import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewLaudoPage } from './new-laudo';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NewLaudoPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(NewLaudoPage),
  ],
})
export class NewLaudoPageModule {}
