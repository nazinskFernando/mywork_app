import { UsuarioDTO } from './../models/usuario.dto';
import { StorageService } from './../services/storage.service';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';
  usuario: UsuarioDTO;

  pages: Array<{title: string, component: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public storage: StorageService,
    public auth: AuthService
  ) {   
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Perfil', component: 'ProfilePage' },
      { title: 'Sair', component: ''}
    ];

  } 
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }

  openPage(page : {title:string, component:string}) {

    switch (page.title) {
      case 'Sair':
      this.auth.logout();
      this.nav.setRoot('LoginPage');
      break;

      default:
      this.nav.setRoot(page.component);
    }
  }
}
