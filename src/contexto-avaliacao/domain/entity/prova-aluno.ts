import { Aluno } from "./aluno";
import { BaseEntity } from "./base/entity";
import { Prova } from "./prova";

export class ProvaAluno extends BaseEntity {

    constructor(prova: Prova, aluno: Aluno) {
        super();
    }

}