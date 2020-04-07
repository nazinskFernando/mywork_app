import { LingadaDTO } from './../../models/lingada.dto';
import { LaudoDTO } from '../../models/laudo.dto';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class LingadaService {

    
    constructor(public http: HttpClient
                ) {}  

    findByInspecao(id: string) {
        return this.http.get<LingadaDTO[]>(`${API_CONFIG.baseUrl}/lingadas/inspecao/${id}`);
    } 

    findAll(id: string) {
        return this.http.get<LingadaDTO[]>(`${API_CONFIG.baseUrl}/lingadas`);
    } 

    findById(id: string) {
        return this.http.get<LingadaDTO>(`${API_CONFIG.baseUrl}/lingadas/${id}`);
    } 

    delete(id: string) {
        return this.http.delete(`${API_CONFIG.baseUrl}/lingadas/${id}`);
    }

    insert(obj : LingadaDTO) {        
        
        return this.http.post(
            `${API_CONFIG.baseUrl}/lingadas`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : LingadaDTO) {       
        
        return this.http.put(
            `${API_CONFIG.baseUrl}/lingadas`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}