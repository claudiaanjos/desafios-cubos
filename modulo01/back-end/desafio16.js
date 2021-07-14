/* Sara decidiu que a Cubos teve um excelente primeiro trimestre esse ano, por isso convenceu Vlad a aprovar uma viagem para todo mundo da Cubos.O destino da viagem é internacional, então todos os cúbicos precisarão ir para o aeroporto.O plano elaborado foi que todos iriam para o escritório da Cubos e então todos pegariam alguns taxis para ir ao aeroporto.

No entanto alguns cúbicos gostam muito de outros e eles rapidamente formaram grupos de 2, de 3 ou de 4 pessoas.Outros ficaram sozinhos.É imprescindível para a moral de todos que esses grupos viagem juntos.

Agora Vlad precisa saber, qual o menor número possível de taxis que precisam ser chamados sem que nenhum grupo seja quebrado em carros separados ? Sabemos que em todo carro cabem 4 passageiros.

Input Format

A entrada será uma única linha(string) contendo 4 números inteiros: a quantidade de grupos com 1, com 2, com 3 e com 4 pessoas respectivamente.

    Constraints

Quantidade de grupos ≤ 10 ^ 15

Output Format

Imprima o número de taxis que Vlad irá chamar. */

function processData(input) {
    let array = input.split(" ")
    let numeros = []
    for (let numero of array) {
        numero = Number(numero)
        numeros.push(numero)
    }

    let pessoas = numeros[0]
    let taxi = numeros[3]

    if (pessoas >= numeros[2]) {
        pessoas = pessoas - numeros[2]
        taxi = taxi + numeros[2]
    } else if (numeros[2] === 0) {
        taxi = taxi
        pessoas = pessoas
    } else {
        taxi = taxi + numeros[2]
        pessoas = 0
    }

    let quantidade = 0
    if (numeros[1] >= 1) {
        quantidade = numeros[1] * 2
        taxi = taxi + parseInt(quantidade / 4)
        pessoas = pessoas + (quantidade % 4)
    }

    if (pessoas > 4) {
        taxi = taxi + parseInt(pessoas / 4)
        if (pessoas % 4 !== 0) {
            taxi++
        }
    } else if (pessoas === 0) {
        taxi = taxi
    } else if (pessoas <= 4) {
        taxi++
    }

    console.log(taxi)
}

processData("2 0 3 0")