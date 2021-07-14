/* Thacila está preocupada com as condições de trabalho em nosso ambiente cúbico, em especial com o quanto as pessoas precisam andar dentro da sala.Também é comum na Cubos que uma pessoa tire dúvidas com outra indo até a mesa do colega, caminhando a distância.Ela está fazendo um trabalho de realocar as mesas da sala para que as pessoas precisem andar o mínimo possível.Para tal, ela precisa primeiro rever a posição atual e determinar qual é a maior distância que precisa ser andada para uma pessoa chegar na mesa do colega.Como o número de pessoas está ficando bem grande, ela precisa escrever um programa para isso.Considere que cada pessoa é um ponto no plano euclidiano e que a distância é sempre uma linha reta entre dois pontos.

Input Format

Neste problema a entranda é um único string que você deve tratar adequadamente para obter as informações que você precisa em variáveis separadas.

A primeira linha deste string será o inteiro N que indica o número de funcionários da Cubos.Nas próximas N linhas você lerá dois números, as coordenadas X e Y do i - ésimo funcionário.

    Constraints

2 ≤ N ≤ 10 ^ 3 - 1000 ≤ X, Y ≤ 1000

Output Format

Imprima um único número, a resposta para o problema. */


function processData(input) {
    const array = input.trim().split("\n")

    let valorMaximo = 0

    for (let i = 1; i < array.length; i++) {

        const coordenadas = array[i].split(" ")
        const x1 = parseFloat(coordenadas[0])
        const y1 = parseFloat(coordenadas[1])

        for (let j = i; j < array.length; j++) {

            const coordenadas02 = array[j].split(" ")
            const x2 = parseFloat(coordenadas02[0])
            const y2 = parseFloat(coordenadas02[1])

            const distancia = (Math.hypot((x1 - x2), (y1 - y2)))

            valorMaximo = distancia > valorMaximo ? distancia : valorMaximo
        }
    }
    console.log(valorMaximo)
}

processData("3\n0 0\n0 3\n4 0")


