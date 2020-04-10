import { LingadaService } from './../services/domain/lingada.service';
import { LaudoService } from '../services/domain/laudo.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

import { InspecaoService } from '../services/domain/inspecao.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/domain/usuario.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ImageUtilService } from '../services/image-util.service';
import { AcessorioComponenteService } from '../services/domain/acessorio_componente.service';
import { EquipamentoService } from '../services/domain/equipamento.service';
import { EquipamentoConectadoService } from '../services/domain/equipamentoConectado.service';
import { UsuarioComponent } from '../components/usuario/usuario';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,    
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    UsuarioService,
    ImageUtilService,
    InspecaoService,
    LaudoService,
    LingadaService,
    EquipamentoService,
    AcessorioComponenteService,
    EquipamentoConectadoService,
    Camera
  ]
})
export class AppModule {}
