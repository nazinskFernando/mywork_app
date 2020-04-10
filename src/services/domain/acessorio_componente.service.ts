import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { AcessoriosComponentesDTO } from '../../models/acessoriosComponentes.dto';

@Injectable()
export class AcessorioComponenteService {

    
    constructor(public http: HttpClient
                ) {}  

    findByInspecao(id: string) {
        return this.http.get<AcessoriosComponentesDTO[]>(`${API_CONFIG.baseUrl}/acessorios_componentes/inspecao/${id}`);
    } 

    findAll(id: string) {
        return this.http.get<AcessoriosComponentesDTO[]>(`${API_CONFIG.baseUrl}/acessorios_componentes`);
    } 

    findById(id: string) {
        return this.http.get<AcessoriosComponentesDTO>(`${API_CONFIG.baseUrl}/acessorios_componentes/${id}`);
    } 

    delete(id: string) {
        return this.http.delete(`${API_CONFIG.baseUrl}/acessorios_componentes/${id}`);
    }

    insert(obj : AcessoriosComponentesDTO) {        
        
        return this.http.post(
            `${API_CONFIG.baseUrl}/acessorios_componentes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : AcessoriosComponentesDTO) {       
        
        return this.http.put(
            `${API_CONFIG.baseUrl}/acessorios_componentes`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}