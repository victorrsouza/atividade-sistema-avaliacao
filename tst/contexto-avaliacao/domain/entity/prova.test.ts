import { randomUUID } from "crypto";
import { Aluno } from "../../../../src/contexto-avaliacao/domain/entity/aluno";
import { Professor } from "../../../../src/contexto-avaliacao/domain/entity/professor";
import { Prova } from "../../../../src/contexto-avaliacao/domain/entity/prova";
import { ProvaAluno } from "../../../../src/contexto-avaliacao/domain/entity/prova-aluno";
import { QuestaoDiscursiva } from "../../../../src/contexto-avaliacao/domain/entity/questao-discursiva";
import { MinQuestionError } from "../../../../src/contexto-avaliacao/domain/error/min-question-error";
import { NotFoundOptionError } from "../../../../src/contexto-avaliacao/domain/error/not-found-option-error";
import { NotFoundQuestionError } from "../../../../src/contexto-avaliacao/domain/error/not-found-question-error";

describe('Entidade Prova', () => {

    test('deve retornar a disciplina da prova com sucesso', () => {
        
        //Given
        const professor = new Professor('Victor')
        const prova = new Prova('modelagem e arq. de software', professor)

        //When
        const result = prova.disciplina()

        //Then
        expect(result).toBe('modelagem e arq. de software')
    });    

    test('deve lançar um erro caso prova não possuia pelo menos 1 questão', () => {

        //Given
        const professor = new Professor('Victor')
        const prova = new Prova('modelagem e arq. de software', professor)
        const aluno = new Aluno('Zezinho')

        //When
        const acao = () => prova.iniciar(aluno)

        //Then
        expect(acao).toThrowError(MinQuestionError)
        expect(acao).toThrowError('Prova não pode ser iniciada sem questões')
    });

    test('deve iniciar prova com sucesso', () => {

        //Given
        const professor = new Professor('Victor')
        const prova = new Prova('modelagem e arq. de software', professor)
        const aluno = new Aluno('Zezinho')

        const questao1 = new QuestaoDiscursiva()
        prova.adicionarQuestao(questao1)

        //When
        const result = prova.iniciar(aluno)

        //Then
        expect(result).not.toBeNull()
        expect(result).toBeInstanceOf(ProvaAluno)
    })

    test('deve adicionar questao na prova com sucesso', () => {
        
        //Given
        const professor = new Professor('Victor')
        const prova = new Prova('modelagem e arq. de software', professor)

        const questao = new QuestaoDiscursiva()

        //When
        prova.adicionarQuestao(questao)

        //Then
        expect(prova.questoes().length).toBe(1)
        expect(prova.questoes()[0].id()).toBe(questao.id())
    });

    test('deve remover questao na prova com sucesso', () => {
        
        //Given
        const professor = new Professor('Victor')
        const prova = new Prova('modelagem e arq. de software', professor)

        const questao1 = new QuestaoDiscursiva()
        const questao2 = new QuestaoDiscursiva()

        prova.adicionarQuestao(questao1)
        prova.adicionarQuestao(questao2)

        //When
        prova.removerQuestao(questao1.id())

        //Then
        expect(prova.questoes().length).toBe(1)
        expect(prova.questoes()[0].id()).toBe(questao1.id())
        expect(prova.questoes()[0].enunciado()).toBe(questao1.enunciado())
        expect(prova.questoes()[0].valor()).toBe(questao1.valor())
    });

    test('deve alterar questao na prova com sucesso', () => {
        
        //Given
        const professor = new Professor('Victor')
        const prova = new Prova('modelagem e arq. de software', professor)

        const questao1 = new QuestaoDiscursiva()
        questao1.atualizar('enunciado1', 1)
        prova.adicionarQuestao(questao1)

        const questao2 = new QuestaoDiscursiva()
        questao2.atualizar('enunciado2', 2)

        //When
        prova.atualizarQuestao(questao1.id(), questao2)

        //Then
        expect(prova.questoes().length).toBe(1)
        expect(prova.questoes()[0].id()).toBe(questao2.id())
        expect(prova.questoes()[0].enunciado()).toBe(questao2.enunciado())
        expect(prova.questoes()[0].valor()).toBe(questao2.valor())
    });

    test('deve lançar erro ao excluir questao inexistente', () => {
        
        //Given
        const professor = new Professor('Victor')
        const prova = new Prova('modelagem e arq. de software', professor)

        const id = randomUUID()

        //When
        const acao = () => prova.removerQuestao(id)

        //Then
        expect(acao).toThrow(NotFoundOptionError)
        expect(acao).toThrow(`Questão ${id} não encontrada`)
    });

    test('deve lançar erro ao alterar questao inexistente', () => {
        
        //Given
        const professor = new Professor('Victor')
        const prova = new Prova('modelagem e arq. de software', professor)

        const questao1 = new QuestaoDiscursiva()
        questao1.atualizar('enunciado1', 1)
        prova.adicionarQuestao(questao1)

        const id = questao1.id()

        //When
        const acao = () => prova.atualizarQuestao(id, questao1)

        //Then
        expect(acao).toThrow(NotFoundQuestionError)
        expect(acao).toThrow(`Questão ${id} não encontrada`)
    });

});