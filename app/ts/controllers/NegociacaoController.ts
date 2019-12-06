import { Negociacoes, Negociacao, NegociacaoParcial } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { domInject, throttle } from '../helpers/Decorators/index';
import { NegociacaoService } from '../services/index';
import { Imprime } from '../helpers/Util';

export class NegociacaoController{
    @domInject("#data")
    private _inputData: JQuery;

    @domInject("#quantidade")
    private _inputQuantidade: JQuery;

    @domInject("#valor")

    private _inputValor: JQuery;
    private _negociacoes: Negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');
    private _negociacaoService = new NegociacaoService();

    constructor(){
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event){
        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if(!this._ehDiaUtil(data)){
            this._mensagemView.update("Somente negociações efetuadas em dias úteis são aceitas.");
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val())
        );

        Imprime(negociacao, this._negociacoes);

        this._negociacoes.adiciona(negociacao);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update("Negociacao adicionada com sucesso.");
    }

    @throttle(1000)
    importaDados(){
        function isOk(res: Response){
            if(res.ok){
                return res;
            }
            else{
                throw new Error(res.statusText);
            }
        }

        this._negociacaoService
            .obterNegociacoes(isOk)
            .then(negociacoesParaImportar => {
                const negociacoesJaImportadas = this._negociacoes.paraArray();
                
                negociacoesParaImportar
                    .filter(negociacao => 
                        !negociacoesJaImportadas.some(negociacaoJaImportada => 
                            negociacao.ehIgual(negociacaoJaImportada)))
                .forEach(negociacao =>
                this._negociacoes.adiciona(negociacao));
                
                this._negociacoesView.update(this._negociacoes);
            
            });        
    }

    private _ehDiaUtil(data : Date): boolean{
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo
    }
}

enum DiaDaSemana{
    Segunda = 1,
    Terca = 2,
    Quarta = 3,
    Quinta = 4,
    Sexta = 5,
    Sabado = 6,
    Domingo = 0
}