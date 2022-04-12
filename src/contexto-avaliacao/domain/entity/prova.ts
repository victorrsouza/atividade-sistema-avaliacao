import { MinQuestionError } from "../error/min-question-error";
import { NotFoundQuestionError } from "../error/not-found-question-error";
import { Aluno } from "./aluno";
import { BaseEntity } from "./base/entity";
import { Professor } from "./professor";
import { ProvaAluno } from "./prova-aluno";
import { Questao } from "./questao"

export class Prova extends BaseEntity {

    private readonly _disciplina: string
    private readonly _professor: Professor
    private readonly _listaQuestoes: Array<Questao> = [];

    constructor(disciplina: string, professor: Professor) {
        super();
        this._disciplina = disciplina
        this._professor = professor
    }

    public disciplina = () => this._disciplina
    public professor = () => this._professor
    public questoes = () => this._listaQuestoes

    public adicionarQuestao(questao: Questao) : void {
        this._listaQuestoes.push(questao);
    }

    public atualizarQuestao(id: string, questao: Questao) : void {
        const questao_encontrada = this._listaQuestoes.find(x => x.id() === id)

        if (!questao_encontrada) {
            throw new NotFoundQuestionError(`Questão ${id} não encontrada`)
        }

        questao_encontrada.atualizar(questao.enunciado(), questao.valor())
    }

    public removerQuestao(id: string) : void {
        const index = this._listaQuestoes.findIndex(x => x.id() === id)

        if (index < 0) {
            throw new NotFoundQuestionError(`Questão ${id} não encontrada`)
        }

        this._listaQuestoes.splice(index, 1)
    }
    
    public iniciar(aluno: Aluno): ProvaAluno {

        if (this._listaQuestoes.length === 0) {
            throw new MinQuestionError('Prova não pode ser iniciada sem questões')
        }

        const provaAluno = new ProvaAluno(this, aluno)
        return provaAluno
    }
        
}