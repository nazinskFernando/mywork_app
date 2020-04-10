import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcessoriosComponentesPage } from './acessorios-componentes';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AcessoriosComponentesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AcessoriosComponentesPage),
  ],
})
export class AcessoriosComponentesPageModule {}
