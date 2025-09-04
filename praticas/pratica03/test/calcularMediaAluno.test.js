const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test ('a função calcularMediaAluno deve estar definido aluno', () =>{
    expect(calcularMediaAluno).toBeDefined();
});


  test('lança erro quando a1 está indefinido', () => {
    expect(() => calcularMediaAluno(undefined, 5)).toThrow('Notas a1 ou a2 não informadas');
  });

  test('lança erro quando a2 está indefinido', () => {
    expect(() => calcularMediaAluno(7, undefined)).toThrow('Notas a1 ou a2 não informadas');
  });

  test('lança erro quando a1 é negativo', () => {
    expect(() => calcularMediaAluno(-1, 5)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });

  test('lança erro quando a2 é negativo', () => {
    expect(() => calcularMediaAluno(7, -3)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });

  test('calcula média base corretamente quando a3 é indefinida', () => {
    expect(calcularMediaAluno(5, 7)).toBeCloseTo(5 * 0.4 + 7 * 0.6);
  });

   test('lança erro quando a3 é negativo', () => {
    expect(() => calcularMediaAluno(5, 7, -2)).toThrow('Nota a3 não pode ser negativa');
  });

  test('calcula média correta quando melhor combinação é a1 com a3', () => {
    const a1 = 8;
    const a2 = 5;
    const a3 = 9;
    expect(calcularMediaAluno(a1, a2, a3)).toBeCloseTo(8.5);
  });

  
  test('calcula média correta quando melhor combinação é a2 com a3', () => {
    const a1 = 4;
    const a2 = 8;
    const a3 = 9;
    expect(calcularMediaAluno(a1, a2, a3)).toBeCloseTo(8.5);
  });

