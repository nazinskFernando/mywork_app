import { API_CONFIG } from './../../config/api.config';
import { LaudoService } from '../../services/domain/laudo.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { LaudoDTO } from '../../models/laudo.dto';
/**
 * Generated class for the DetalheInspecaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhe-inspecao',
  templateUrl: 'detalhe-inspecao.html',
})
export class DetalheInspecaoPage {

  inspecaoDto: LaudoDTO;
  cameraOn: boolean = false;
  picture: string;
  profileImage;
  count: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public inspecaoService: LaudoService,
    public sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalheInspecaoPage');
  }

  maisCount(){
    this.count ++;
  }

  menosCount(){
    this.count ++;
  }

  getImageIfExists() {
    this.maisCount();
    this.inspecaoService.getImageFromBucket(this.inspecaoDto.id)
      .subscribe(response => {
        this.inspecaoDto.imageUrl[0] = `${API_CONFIG.bucketBaseUrl}/cp1.jpg`;
        this.blobToDataURL(response).then(dataUrl => {
          let str: string = dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
        });
      },
        error => {
          this.profileImage = 'assets/imgs/avatar-blank.png';
        });
  }

  // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
    })
  }

  getCameraPicture() {

    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  sendPicture() {
    let id = this.inspecaoDto.id.toString() + this.count.toString();
    this.inspecaoService.uploadPicture(this.picture, id)
      .subscribe(response => {
        console.log(response);
        this.picture = null;
        this.getImageIfExists();
      },
        error => {
        });
  }

  cancel() {
    this.picture = null;
  }

}
