import { BaseEntity } from "./base/entity";

export abstract class Questao extends BaseEntity {

    private _enunciado : string
    private _valor : number

    public enunciado = () => this._enunciado
    public valor = () => this._valor

    public atualizar(enunciado: string, valor: number) : void {
        this._enunciado = enunciado
        this._valor = valor
    }

}