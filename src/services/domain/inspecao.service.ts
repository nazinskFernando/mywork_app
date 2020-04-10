import { InspecaoDTO } from "../../models/inspecao.dto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class InspecaoService {
  constructor(public http: HttpClient) {}

  findAll(): Observable<InspecaoDTO[]> {
    return this.http.get<InspecaoDTO[]>(
      `${API_CONFIG.baseUrl}/inspecao/pendente`
    );
  }
  findById(id: string) {
    return this.http.get<InspecaoDTO>(`${API_CONFIG.baseUrl}/inspecao/${id}`);
  }

  update(obj : InspecaoDTO) {       
        
    return this.http.put(
        `${API_CONFIG.baseUrl}/inspecao/status`, 
        obj,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
}
}
