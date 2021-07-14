/* Um determinado evento é permitido apenas para maiores de idade.Através de um lista com as idades dos potenciais participantes, seu objetivo é fazer um programa que determine qual a idade da pessoa mais nova, dentre os que podem participar(maiores de idade).

Input Format

A entrada é um array com as idades das pessoas que tentam participar.

    Constraints

A lista contém de 1 a 1000 itens

Output Format

Imprima na tela a idade da pessoa mais jovem que pode participar.Se ninguém puder participar, imprima na tela a mensagem CRESCA E APARECA. */

function solucao(lista) {
    let maioresDeIdade = lista.filter(idade => idade >= 18)
    console.log(maioresDeIdade.length === 0 ? `CRESCA E APARECA` : Math.min(...maioresDeIdade))
}

solucao([30, 10, 18, 30])
