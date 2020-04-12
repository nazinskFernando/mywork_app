import { LaudoDTO } from "./../../models/laudo.dto";
import { DescricaoLaudoDTO } from "./../../models/descricaoLaudo.dto";
import { TipoLaudoDTO } from "./../../models/tipoLaudo.dto";
import { InspecaoService } from "./../../services/domain/inspecao.service";
import { API_CONFIG } from "./../../config/api.config";
import { LaudoService } from "../../services/domain/laudo.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { DomSanitizer } from "@angular/platform-browser";
import { InspecaoDTO } from "../../models/inspecao.dto";
import { linkToSegment } from "ionic-angular/umd/navigation/nav-util";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
/**
 * Generated class for the DetalheInspecaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-detalhe-inspecao",
  templateUrl: "detalhe-inspecao.html"
})
export class DetalheInspecaoPage {
  laudo = new LaudoDTO("", null, null, false, null, null);
  cameraOn: boolean = false;
  profileImage;
  idImagem: string;
  inspecaoId: string;
  inspecao: InspecaoDTO;
  tiposLaudo: TipoLaudoDTO[];
  tipoLaudo: TipoLaudoDTO;
  descricaoLaudoDTO: DescricaoLaudoDTO;
  descricoesLaudo: DescricaoLaudoDTO[];
  laudos = new Array<LaudoDTO>();
  teste: string;
  descricaoTipo: string;
  tiposLaudoAll: TipoLaudoDTO[];
  qtdTitulo: number = 0;
  qtdDescricao: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public laudoService: LaudoService,
    public sanitizer: DomSanitizer,
    public inspecaoService: InspecaoService,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController
  ) {
    this.inspecaoId = this.navParams.get("inspecaoId");
    this.laudo.id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    if (this.laudo.id != undefined) {
      let laudoId = this.laudo.id;
      this.laudoService.findByLaudoId(laudoId).subscribe(
        (response: LaudoDTO) => {
          this.laudo = response;
          this.getInspecao();
        },
        error => {}
      );
    }
  }

   getTipoLaudoAll() {
    this.laudoService.findAll().subscribe(
      (response: TipoLaudoDTO[]) => {
        this.tiposLaudoAll = response;
        this.tiposLaudoAll.push(new TipoLaudoDTO(null, "Outro"));
        for(let index = 0; index < this.tiposLaudoAll.length; index++){          
          if(this.tiposLaudoAll[index].id == this.laudo.descricaoLaudo.tipoLaudo.id.toString()){
            this.tipoLaudo = this.tiposLaudoAll[index];
          }
        }
       
      },
      error => {}
    );
  }

  getInspecao() {
    this.inspecaoService.findById(this.inspecaoId).subscribe(
      (response: InspecaoDTO) => {
        this.inspecao = response;
        this.laudos = this.inspecao.laudos;
        this.idImagem = this.laudo.imagem.substring(this.laudo.imagem.indexOf("com/") + 6);
        this.idImagem = this.idImagem.split(".")[0];
        console.log('imagem valor', this.idImagem)
        this.getTipoLaudoAll();
      },
      error => {}
    );
  }

  getDescricaoLaudo(tipoLaudo: any) {
    if (tipoLaudo.descricao != "Outro") {
      if (this.tipoLaudo.id != null) {
        this.laudoService.findByDescricaoLaudo(tipoLaudo.id).subscribe(
          (response: DescricaoLaudoDTO[]) => {
            this.descricoesLaudo = response;
            for(let index = 0; index < this.descricoesLaudo.length; index++){          
              if(this.descricoesLaudo[index].id == this.laudo.descricaoLaudo.id.toString()){
                this.descricaoLaudoDTO = this.descricoesLaudo[index];                
              }
            }
          },
          error => {}
        );
      }
    } else {
      this.showPrompt("Titulo", "Informe um novo titulo", "titulo");
    }
  }

  getDescricaoLaudoSelecionado(value: DescricaoLaudoDTO) {
    if (value.descricao == "Outro") {
      this.showPrompt("Descrição", "Informe uma nova descrição", "descricao");
    }
  }

  showPrompt(titulo: string, descricao: string, valorASerSalvo: string) {
    const prompt = this.alertCtrl.create({
      title: titulo,
      message: descricao,
      inputs: [
        {
          name: "valor",
          placeholder: titulo
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Salvar",
          handler: data => {
            this.saveTituloOrDescricao(data.valor, valorASerSalvo);
          }
        }
      ]
    });
    prompt.present();
  }

  saveTituloOrDescricao(valor: string, tipoValor: string) {
    console.log("valor: ", valor, " tipoValor: ", tipoValor);
    if(tipoValor == "titulo"){
      this.saveTitulo(valor);
    } else {
      this.saveDescricao(valor);
    }
    
  }


  saveTitulo(tituloValue: string) {
    this.qtdTitulo++;
    if(this.qtdTitulo <= 1){
    
      var titulo = new TipoLaudoDTO(null, tituloValue);
      this.tiposLaudoAll.push(titulo);
      this.tipoLaudo = titulo;
      this.descricoesLaudo = [];
      this.descricoesLaudo.push(new DescricaoLaudoDTO(null, "Outro", titulo));      
    
    }
  }

  saveDescricao(descricao: string) {
    this.qtdDescricao++;
    if(this.qtdDescricao <= 1){
    
      var descricaoVal = new DescricaoLaudoDTO(null, descricao, this.tipoLaudo);
      this.descricoesLaudo.push(descricaoVal);
      this.descricaoLaudoDTO = descricaoVal;
      // this.laudo.descricaoLaudo = descricaoVal;
    }
  }

  update() {    
    this.laudo.equipamento = this.inspecao.equipamento.id;
    this.laudo.inspecao = this.inspecaoId;  
    this.laudo.descricaoLaudo = this.descricaoLaudoDTO;  
    this.laudo.descricaoLaudo.tipoLaudo = this.tipoLaudo;
   
    this.laudoService.update(this.laudo).subscribe(
      response => {
        this.closeModal();
      },
      error => {}
    );
  }

  

  // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
  // blobToDataURL(blob) {
  //   return new Promise((fulfill, reject) => {
  //     let reader = new FileReader();
  //     reader.onerror = reject;
  //     reader.onload = e => fulfill(reader.result);
  //     reader.readAsDataURL(blob);
  //   });
  // }

  getCameraPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 1000,
      targetHeight: 680,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.laudo.imagem = "data:image/png;base64," + imageData;
        this.cameraOn = false;
      },
      err => {
        this.cameraOn = false;
      }
    );
  }

  finalizar() {
    
    if (this.laudo.imagem != null) {
      let imagem = this.laudo.imagem.substring(0, 5);
      if (imagem != "https") {
        this.laudoService.uploadPicture(this.laudo.imagem, this.idImagem).subscribe(
          response => {
            this.laudo.imagem = response.body;     
            this.update();       
          },
          error => {}
        );
      }
       
      
    }
  }

  getPhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 1000,
      targetHeight: 680,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.laudo.imagem = "data:image/png;base64," + imageData;
    });
    
  }

  cancel() {
    this.laudo.imagem = null;
  }

  closeModal(){
    this.viewCtrl.dismiss({ id: this.inspecaoId });
  }
}
