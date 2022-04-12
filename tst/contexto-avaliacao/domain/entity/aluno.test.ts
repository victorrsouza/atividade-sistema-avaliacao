import { Aluno } from "../../../../src/contexto-avaliacao/domain/entity/aluno";

describe('Entidade Aluno', () => {
    test('deve retorno o nome do aluno com sucesso', () => {    
        //Given
        const aluno = new Aluno('Victor')

        //When
        const result = aluno.nome()

        //Then
        expect(result).toBe('Victor')
    });    
});

