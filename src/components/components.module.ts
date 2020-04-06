import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { InspecaoComponent } from './inspecao/inspecao';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [InspecaoComponent],
	imports: [
		IonicModule,
		CommonModule,		
		IonicModule],
	exports: [InspecaoComponent]
})
export class ComponentsModule {}
