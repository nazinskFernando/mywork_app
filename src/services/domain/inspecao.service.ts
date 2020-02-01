import { InspecaoDTO } from '../../models/inspecao.dto';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class InspecaoService {

    
    constructor(public http: HttpClient) {
    }

    findAll() : Observable<InspecaoDTO[]>  {
        return this.http.get<InspecaoDTO[]>(`${API_CONFIG.baseUrl}/inspecao/pendente`);
    }

    
}