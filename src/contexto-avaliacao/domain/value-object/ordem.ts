export class Ordem {
    private readonly _valor : number
    
    constructor(valor: number) {

        if (valor < 1) throw new Error('Ordem não pode possuir valor menor que 1')
        if (valor > 100) throw new Error('Ordem não pode possuir valor maior que 100')

        this._valor = valor
    }

    public valor = () => this._valor

    public equals(ordem: Ordem) : boolean {
        return this._valor !== ordem.valor()
    }
}