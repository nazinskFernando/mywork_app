export class LaudoDTO {

    constructor(
        public id: string,
        public imagem: any,
        public descricaoLaudo: string,
        public tipo: string,
        public usarRelatorio: boolean,
        public comDesvio: boolean,
        public inspecao: number
    ){

    }
}