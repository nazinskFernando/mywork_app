import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EquipamentoConectadoDTO } from "../../models/equipamentoConectado.dto";

@Injectable()
export class EquipamentoConectadoService {

    
    constructor(public http: HttpClient
                ) {}  

    findByInspecao(id: string) {
        return this.http.get<EquipamentoConectadoDTO[]>(`${API_CONFIG.baseUrl}/equipamentoconectado/inspecao/${id}`);
    } 

    findAll(id: string) {
        return this.http.get<EquipamentoConectadoDTO[]>(`${API_CONFIG.baseUrl}/equipamentoconectado`);
    } 

    findById(id: string) {
        return this.http.get<EquipamentoConectadoDTO>(`${API_CONFIG.baseUrl}/equipamentoconectado/${id}`);
    } 

    delete(id: string) {
        return this.http.delete(`${API_CONFIG.baseUrl}/equipamentoconectado/${id}`);
    }

    insert(obj : EquipamentoConectadoDTO) {        
        
        return this.http.post(
            `${API_CONFIG.baseUrl}/equipamentoconectado`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : EquipamentoConectadoDTO) {       
        
        return this.http.put(
            `${API_CONFIG.baseUrl}/equipamentoconectado`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}