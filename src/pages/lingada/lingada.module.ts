import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LingadaPage } from './lingada';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LingadaPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(LingadaPage),
  ],
})
export class LingadaPageModule {}
