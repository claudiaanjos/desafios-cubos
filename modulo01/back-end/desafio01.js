/* Álvaro está economizando para comprar uma uma passagem para a europa. Por isso diariamente ele coloca um valor no cofre. Faça um programa que calcule o total acumulado no cofre até o momento.

Input Format

A entrada será sempre uma lista de inteiros positivos.

Constraints

A lista pode conter até 1000 inteiros positivos.

Output Format

Imprima na tela o total acumulado nessa lista. */

function solucao(lista) {
    console.log (lista.reduce((acc, valor) => acc + valor))
}

solucao([1, 5])