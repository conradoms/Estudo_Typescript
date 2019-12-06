import { Negociacao, NegociacaoParcial } from "../models/index";

export class NegociacaoService{
    obterNegociacoes(handler: HandleFunction): Promise<Negociacao[]>{
        return fetch('http://localhost:8080/dados')
        .then(res => handler(res))
        .then(res => res.json())
        .then((dados: NegociacaoParcial[]) => 
            dados.map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
        )
        .catch(err => {throw console.log(err)});
    }
}

export interface HandleFunction{
    (res: Response) : Response;
}