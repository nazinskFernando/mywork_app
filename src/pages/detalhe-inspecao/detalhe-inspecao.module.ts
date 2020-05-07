import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheInspecaoPage } from './detalhe-inspecao';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DetalheInspecaoPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(DetalheInspecaoPage),
  ],
  providers: [
    Camera
  ]
})
export class DetalheInspecaoPageModule {}
