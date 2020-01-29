import { EquipamentoDTO } from './../../models/equipamento.dto';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class EquipamentoService {

    
    constructor(public http: HttpClient) {
    }

    findAll() : Observable<EquipamentoDTO[]>  {
        return this.http.get<EquipamentoDTO[]>(`${API_CONFIG.baseUrl}/equipamentos`);
    }

    
}