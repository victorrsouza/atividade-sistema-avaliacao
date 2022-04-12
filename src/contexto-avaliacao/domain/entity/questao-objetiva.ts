import { MaxAnswerKeyError } from "../error/max-answer-key-error";
import { NotFoundOptionError } from "../error/not-found-option-error";
import { Ordem } from "../value-object/ordem";
import { Opcao } from "./opcao";
import { Questao } from "./questao";

export class QuestaoObjetiva extends Questao {

    private readonly _opcoes : Array<Opcao> = []

    public adicionarOpcao(texto: string, gabarito: boolean = false) : void {

        const jaPossuiGabarito = 
            this._opcoes
                .map(x => x.gabarito() && gabarito)
                .reduce((a, b) => a !== b, false)

        if (jaPossuiGabarito) {
            throw new MaxAnswerKeyError('Questão objetiva não pode ter mais de um gabarito')
        }

        const ordem = new Ordem(this._opcoes.length + 1)
        const opcao = new Opcao(texto, gabarito, ordem)

        this._opcoes.push(opcao)
    }

    public removerOpcao(id: string) : void {
        const index = this._opcoes.findIndex(o => o.id() === id)

        if (index < 0) {
            throw new NotFoundOptionError(`Opção ${id} não encontrada`)
        }

        this._opcoes.splice(index, 1)
    }

    public alterarOrdem(opcao: Opcao, novaOrdem: Ordem) {

        const opcao1 = this._opcoes.find(o => o.ordem().equals(novaOrdem))

        if (opcao1 !== null && opcao1 !== undefined) {
            opcao1.alterarOrdem(opcao.ordem())
        }

        opcao.alterarOrdem(novaOrdem)
    }

    public opcaoPorOrdem = (ordem: Ordem) => this._opcoes.find(o => o.ordem().equals(ordem))

    public opcoesEmOrdem = () => this._opcoes.sort((a, b) => a.ordem().valor() + b.ordem().valor())
    
}