import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { InspecaoComponent } from './inspecao/inspecao';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario';
import { LoadingComponent } from './loading/loading';
@NgModule({
	declarations: [InspecaoComponent,
    UsuarioComponent,
    LoadingComponent],
	imports: [
		IonicModule,
		CommonModule,		
		IonicModule],
	exports: [InspecaoComponent,
    UsuarioComponent,
    LoadingComponent]
})
export class ComponentsModule {}
