import { Ordem } from "../../../../src/contexto-avaliacao/domain/value-object/ordem";

describe('Entidade Questao Objetiva', () => {

    test('deve lancar erro quando possuir ordem com valor menor que 1', () => {
        
        //When
        const acao = () => new Ordem(1)

        //Then
        expect(acao).toThrowError(Error)
        expect(acao).toThrowError('Ordem não pode possuir valor menor que 1')
    });

    test('deve lancar erro quando possuir ordem com valor maior que 100', () => {
        
        //When
        const acao = () => new Ordem(100)

        //Then
        expect(acao).toThrowError(Error)
        expect(acao).toThrowError('Ordem não pode possuir valor maior que 100')
    });

});