import { EquipamentoDTO } from '../../models/equipamento.dto';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class InspecaoService {

    
    constructor(public http: HttpClient,
                public imageUtilService: ImageUtilService
                ) {
    }

    findById(id: string) : Observable<EquipamentoDTO>  {
        return this.http.get<EquipamentoDTO>(`${API_CONFIG.baseUrl}/equipamentos/${id}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }    

    uploadPicture(picture, id) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/inspecao/picture/${id}`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    
}