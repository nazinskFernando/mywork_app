import { LaudoDTO } from './../../models/laudo.dto';
import { InspecaoDTO } from '../../models/inspecao.dto';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ImageUtilService } from "../image-util.service";
import { TipoLaudoDTO } from '../../models/tipoLaudo.dto';
import { DescricaoLaudoDTO } from '../../models/descricaoLaudo.dto';

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

    findByTipoLaudo(id: string) {
        return this.http.get<TipoLaudoDTO[]>(`${API_CONFIG.baseUrl}/descricaolaudo/equipamento/${id}`);
    } 

    findAll() {
        return this.http.get<TipoLaudoDTO[]>(`${API_CONFIG.baseUrl}/descricaolaudo/findalltipolaudo`);
    } 

    delete(id: string) {
        return this.http.delete(`${API_CONFIG.baseUrl}/laudo/${id}`);
    }

    findByDescricaoLaudo(id: string) {
        return this.http.get<DescricaoLaudoDTO[]>(`${API_CONFIG.baseUrl}/descricaolaudo/tipolaudo/${id}`);
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

    update(obj : LaudoDTO) {
        
        
        return this.http.put(
            `${API_CONFIG.baseUrl}/laudo`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}