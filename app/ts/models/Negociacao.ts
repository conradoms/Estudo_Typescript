import { MeuObjeto } from './MeuObjeto';

export class Negociacao implements MeuObjeto<Negociacao> {
    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number){
    }

    get volume(){
        return this.quantidade * this.valor;
    }

    paraTexto(): void{
        console.log('Impressão');
        console.log(`
            Data: ${this.data}
            Quantidade: ${this.quantidade}
            Valor: ${this.valor}
            Volume: ${this.volume}
        `);
    }

    ehIgual(objeto: Negociacao){
        return objeto.data.getDate() === this.data.getDate() 
            && objeto.data.getMonth() === this.data.getMonth() 
            && objeto.data.getFullYear() === this.data.getFullYear() ;
    }
}