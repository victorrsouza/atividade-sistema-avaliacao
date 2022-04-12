import { Professor } from "../../../../src/contexto-avaliacao/domain/entity/professor";
import { ProvaAluno } from "../../../../src/contexto-avaliacao/domain/entity/prova-aluno";

describe('Entidade Professor', () => {
    test('deve retornar o nome do professor com sucesso', () => {    
        //Given
        const professor = new Professor('Victor')

        //When
        const result = professor.nome()

        //Then
        expect(result).toBe('Victorr')
    });

    test('deve criar prova com sucesso com sucesso', () => {    
        //Given
        const professor = new Professor('Victor')

        //When
        const result = professor.criarProva('modelagem e arquitetura de software')

        //Then
        expect(result).not.toBeNull()
        expect(result).toBeInstanceOf(ProvaAluno)
    });
});

