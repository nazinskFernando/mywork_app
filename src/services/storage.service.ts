import { UsuarioDTO } from './../models/usuario.dto';
import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }


    setLocalUser(obj : LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getUsuarioLocal() : UsuarioDTO {
        let usr = localStorage.getItem(STORAGE_KEYS.usuarioLocal);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }
    

    setUsuarioLocal(obj : UsuarioDTO) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.usuarioLocal);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.usuarioLocal, JSON.stringify(obj));
        }
    }
}
