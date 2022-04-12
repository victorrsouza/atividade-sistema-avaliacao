import { BaseEntity } from "./base/entity";

export class Aluno extends BaseEntity {

    private readonly _nome: string

    constructor(nome: string) {
        super();
        this._nome = nome;
    }

    public nome = () => this._nome
}