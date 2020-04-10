import { EquipamentoDTO } from './../../models/equipamento.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class EquipamentoService {
  constructor(public http: HttpClient) {}

  findAll(): Observable<EquipamentoDTO[]> {
    return this.http.get<EquipamentoDTO[]>(
      `${API_CONFIG.baseUrl}/equipamentos`
    );
  }

  findById(id: string) {
    return this.http.get<EquipamentoDTO>(`${API_CONFIG.baseUrl}/equipamentos/${id}`);
  }

  findByEquipamentos(partNumber: string, serialNumber: string) {
    return this.http.get<EquipamentoDTO[]>(`${API_CONFIG.baseUrl}/equipamentos/pesquisa?partNumber=${partNumber}&serialNumber=${serialNumber}`);
  }

  update(obj : EquipamentoDTO) {       
        
    return this.http.put(
        `${API_CONFIG.baseUrl}/equipamentos`, 
        obj,
        { 
            observe: 'response', 
            responseType: 'text'
        }
    ); 
}

insert(obj : EquipamentoDTO){        
        
  return this.http.post(
      `${API_CONFIG.baseUrl}/equipamentos`, 
      obj,
      { 
          observe: 'response', 
          responseType: 'text'
      }
  ); 
}
}
