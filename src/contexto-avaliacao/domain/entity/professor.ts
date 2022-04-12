import { BaseEntity } from "./base/entity"
import { Prova } from "./prova"

export class Professor extends BaseEntity {
    private readonly _nome: string
    
    constructor(nome: string) {
        super();
        this._nome = nome
    }

    public nome = () => this._nome

    public criarProva(disciplina: string): Prova {
        const prova = new Prova(disciplina, this)
        return prova
    }
}