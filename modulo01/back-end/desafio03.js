// Seu objetivo é:

// Implementar uma função que receba três argumentos: numero, limiteInferior e limiteSuperior;
// Essa função deve retornar se esse número pertence ao conjunto que é limitado pelo limiteInferior e limiteSuperior
// Pertencer ao conjunto significa que dado o numero, ele deve ser maior ou igual que o limiteInferior e menor ou igual do que o limiteSuperior.

// Input Format

// A entrada consista de três parâmetros: numero, limiteInferior e limiteSuperior.

// numero refere - se ao número desejado para saber se ele está dentro ou não do limite.limiteInferior refere - se ao menor valor do limite de um dado intervalo; limiteSuperior refere - se ao maior valor do limite de um dado intervalo;

// Constraints

/* Quaisquer números inteiros;
limiteInferior menor ou igual ao limiteSuperior;
Output Format

Imprima uma das duas opções abaixo:

PERTENCE - para quando um número pertence ao limite delimitado;
NAO PERTENCE - para quando um número não pertence ao limite delimitado */

function solucao(numero, limiteInferior, limiteSuperior) {
    console.log(numero >= limiteInferior && numero <= limiteSuperior ? "PERTENCE" : "NAO PERTENCE")
}

solucao(4, 5, 20)