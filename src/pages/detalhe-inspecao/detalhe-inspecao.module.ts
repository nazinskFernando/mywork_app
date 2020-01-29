import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheInspecaoPage } from './detalhe-inspecao';
import { Camera, CameraOptions } from '@ionic-native/camera';

@NgModule({
  declarations: [
    DetalheInspecaoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheInspecaoPage),
  ],
  providers: [
    Camera
  ]
})
export class DetalheInspecaoPageModule {}
