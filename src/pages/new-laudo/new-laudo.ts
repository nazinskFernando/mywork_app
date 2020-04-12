import { DescricaoLaudoDTO } from "./../../models/descricaoLaudo.dto";
import { TipoLaudoDTO } from "./../../models/tipoLaudo.dto";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";
import { LaudoDTO } from "../../models/laudo.dto";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { LaudoService } from "../../services/domain/laudo.service";
import { DomSanitizer } from "@angular/platform-browser";
import { InspecaoService } from "../../services/domain/inspecao.service";
import { InspecaoDTO } from "../../models/inspecao.dto";
import { AlertController } from "ionic-angular";
/**
 * Generated class for the NewLaudoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-new-laudo",
  templateUrl: "new-laudo.html"
})
export class NewLaudoPage {
  laudo = new LaudoDTO("", null, null, false, null);
  cameraOn: boolean = false;
  profileImage;
  count: number = 0;
  qtdTitulo: number = 0;
  qtdDescricao: number = 0;
  inspecaoId: string;
  inspecao: InspecaoDTO;
  tiposLaudoSelecionado: TipoLaudoDTO[];
  tiposLaudoAll: TipoLaudoDTO[];
  tipoLaudo: TipoLaudoDTO;
  descricaoLaudoDTO: DescricaoLaudoDTO;
  descricoesLaudo: DescricaoLaudoDTO[];
  laudos = new Array<LaudoDTO>();
  teste: string;
  descricaoTipo: string;
  equipamentoId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public laudoService: LaudoService,
    public sanitizer: DomSanitizer,
    public inspecaoService: InspecaoService,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,  
  ) {
    this.inspecaoId = this.navParams.get("inspecaoId");
    this.count = this.navParams.get("count");
    console.log('count ', this.count);
  }

  ionViewDidLoad() {
    this.getTipoLaudoAll();
  }

  getInspecao() {
    this.inspecaoService.findById(this.inspecaoId).subscribe(
      (response: InspecaoDTO) => {
        this.inspecao = response;
        this.laudos = this.inspecao.laudos;
        this.count = this.laudos.length;
        this.equipamentoId = this.inspecao.equipamento.id;

        this.getTipoLaudo();
      },
      error => {}
    );
  }

  getTipoLaudo() {
    this.laudoService.findByTipoLaudo(this.inspecao.equipamento.id).subscribe(
      (response: TipoLaudoDTO[]) => {
        this.tiposLaudoSelecionado = response;
        this.tiposLaudoSelecionado.push(new TipoLaudoDTO(null, "Outro"));
        if (this.tiposLaudoSelecionado.length >= this.count + 1) {
          for (let index = 0; index < this.tiposLaudoAll.length; index++) {
            if (this.tiposLaudoAll[this.count] == this.tiposLaudoAll[index]) {
              this.tipoLaudo = this.tiposLaudoAll[index];
            }
          }
          this.getDescricaoLaudo(this.tipoLaudo);
        }
      },
      error => {}
    );
  }

  getTipoLaudoAll() {
    this.laudoService.findAll().subscribe(
      (response: TipoLaudoDTO[]) => {
        this.tiposLaudoAll = response;
        this.tiposLaudoAll.push(new TipoLaudoDTO(null, "Outro"));

        this.getInspecao();
      },
      error => {}
    );
  }

  getDescricaoLaudo(tipoLaudo: TipoLaudoDTO) {
    if (tipoLaudo.descricao != "Outro") {
      if (this.tipoLaudo.id != null) {
        this.laudoService.findByDescricaoLaudo(tipoLaudo.id).subscribe(
          (response: DescricaoLaudoDTO[]) => {
            this.descricoesLaudo = response;
          },
          error => {}
        );
      }
    } else {
      // this.isTitulo = true;
      this.showPrompt("Titulo", "Informe um novo titulo", "titulo");
    }
  }

  getDescricaoLaudoSelecionado(value: DescricaoLaudoDTO) {
    if (value.descricao == "Outro") {
      // this.isDescricao = true;
      this.showPrompt("Descrição", "Informe uma nova descrição", "descricao");
    }
  }

  inserir(tipoInsercao?: string) {
    this.laudo.equipamento = this.inspecao.equipamento.id;
    this.laudo.inspecao = this.inspecaoId;  
    
    if(this.tipoLaudo != undefined){
      this.laudo.descricaoLaudo.tipoLaudo = this.tipoLaudo;
    } 
    
    this.laudoService.insert(this.laudo).subscribe(
      response => {
        if (tipoInsercao == "proximo") {
          this.proximo();
        } else {
          this.finalizar();
        }
      },
      error => {}
    );
  }

  sendPicture(tipoInsercao: string) {
    if (this.laudo.imagem != null) {
      let id = this.inspecao.id.toString() + this.count.toString();
      let imagem = this.laudo.imagem.substring(0, 5);
      if (imagem != "https") {
        this.laudoService.uploadPicture(this.laudo.imagem, id).subscribe(
          response => {
            this.laudo.imagem = response.body;
            this.inserir(tipoInsercao);
          },
          error => {}
        );
      } else {
        this.inserir(tipoInsercao);
      }
    } else {
      this.finalizar();
    }
  }

  finalizar() {
    this.closeModal();
    // this.navCtrl.push("LaudoPage", { id: this.inspecaoId });
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
  

  proximo() {
    this.count++;
    this.laudo.imagem = null;
    this.tipoLaudo = null;
    this.descricoesLaudo = null;
    this.laudo.comDesvio = false;
    this.laudo.usarRelatorio = false;

    this.getTipoLaudoAll();
  }

  cancel() {
    this.laudo.imagem = null;
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
      this.tiposLaudoSelecionado.push(titulo);
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
      this.laudo.descricaoLaudo = descricaoVal;
      console.log('laudo Final', this.laudo);
    }
  }

  getPhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 1000,
      targetHeight: 680,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      this.laudo.imagem = "data:image/png;base64," + imageData;
    });
    
  }

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

  closeModal(){
    this.viewCtrl.dismiss({id: this.inspecaoId});
  }
  
}
