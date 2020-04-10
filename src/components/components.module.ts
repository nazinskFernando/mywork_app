import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { InspecaoComponent } from './inspecao/inspecao';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario';
@NgModule({
	declarations: [InspecaoComponent,
    UsuarioComponent],
	imports: [
		IonicModule,
		CommonModule,		
		IonicModule],
	exports: [InspecaoComponent,
    UsuarioComponent]
})
export class ComponentsModule {}
