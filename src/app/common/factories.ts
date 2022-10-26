import { IArtista } from "../interfaces/IArtista";

export function newArtistas(): IArtista {
    return {
        id: '',
        nome: '',
        imagemUrl: ''
    }
}