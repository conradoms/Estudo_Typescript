import { logarTempoExecucao } from '../helpers/Decorators/index';

export abstract class View<T>{
    private _elemento: JQuery;

    constructor(seletor: string){
        this._elemento = $(seletor);
    }

    @logarTempoExecucao()
    update(model: T): void{
        
        this._elemento.html(this.template(model));

    }

    abstract template(model: T): string;
}