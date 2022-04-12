import { Ordem } from "../value-object/ordem";
import { BaseEntity } from "./base/entity";

export class Opcao extends BaseEntity {
    
    private readonly _texto: string
    private readonly _gabarito: boolean
    private _ordem: Ordem

    constructor(texto: string, gabarito: boolean, ordem: Ordem) {
        super()
        this._texto = texto
        this._gabarito = gabarito
        this._ordem = ordem
    }

    public texto = () => this._texto
    public gabarito = () => this._gabarito
    public ordem = () => this._ordem

    public alterarOrdem(ordem: Ordem) : void {
        this._ordem = ordem
    }
}