import { QuestaoObjetiva } from "../../../../src/contexto-avaliacao/domain/entity/questao-objetiva";
import { MaxAnswerKeyError } from "../../../../src/contexto-avaliacao/domain/error/max-answer-key-error";
import { Ordem } from "../../../../src/contexto-avaliacao/domain/value-object/ordem";

describe('Entidade Questao Objetiva', () => {

    test('deve lancar erro quando possuir mais de um gabarito', () => {
        
        //Given
        const questao = new QuestaoObjetiva()        
        questao.adicionarOpcao('DDD', true)
        questao.adicionarOpcao('BDD')

        //When
        const acao = () => questao.adicionarOpcao('ADD', true)

        //Then
        expect(acao).toThrowError(MaxAnswerKeyError)
        expect(acao).toThrowError('Questão objetiva não pode ter muitos de um gabarito')
    });

    test('deve armazenar opções em ordem com sucesso', () => {
        
        //Given
        const questao = new QuestaoObjetiva()
        questao.adicionarOpcao('DDD', true)
        questao.adicionarOpcao('CDD')
        questao.adicionarOpcao('BDD')
        questao.adicionarOpcao('ADD')

        //When
        const opcoes = questao.opcoesEmOrdem()

        //Then
        expect(opcoes.length).toBe(4)        
        expect(opcoes[0].texto()).toBe('DDD')        
        expect(opcoes[1].texto()).toBe('BDD')
        expect(opcoes[2].texto()).toBe('CDD')
        expect(opcoes[3].texto()).toBe('ADD')
    });

    test('deve alterar ordem de opção com sucesso', () => {
        
        //Given
        const questao = new QuestaoObjetiva()
        questao.adicionarOpcao('DDD', true)
        questao.adicionarOpcao('CDD')
        questao.adicionarOpcao('BDD')
        questao.adicionarOpcao('ADD')

        const ordem1 = new Ordem(1)
        const opcao = questao.opcaoPorOrdem(ordem1)

        const ordem4 = new Ordem(4)
        
        //When
        questao.alterarOrdem(opcao, ordem4)

        //Then
        const opcoes = questao.opcoesEmOrdem()

        expect(opcoes.length).toBe(4)
        expect(opcoes[0].texto()).toBe('CDD')
        expect(opcoes[1].texto()).toBe('BDD')
        expect(opcoes[2].texto()).toBe('ADD')
        expect(opcoes[3].texto()).toBe('DDD')
    });
});