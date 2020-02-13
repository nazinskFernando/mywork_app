import { LaudoDTO } from './../../models/laudo.dto';
import { InspecaoDTO } from '../../models/inspecao.dto';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class LaudoService {

    
    constructor(public http: HttpClient,
                public imageUtilService: ImageUtilService
                ) {}    

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }    

    uploadPicture(picture, id) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/laudo/picture/${id}`, 
            formData,
            { 
                observe: 'response', 
            }
        ); 
    }
    
    findByLaudoId(id: string) {
        return this.http.get<LaudoDTO>(`${API_CONFIG.baseUrl}/laudo/${id}`);
    }    

    insert(obj : LaudoDTO) {
        
        
        return this.http.post(
            `${API_CONFIG.baseUrl}/laudo`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}