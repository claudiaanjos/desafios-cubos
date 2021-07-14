/* Um novo cofre foi desenvolvido com a mais moderna tecnologia em segurança e criptografia.Na porta o cofre contém um teclado com todas as letras do alfabeto em que a pessoa pode digitar a senha predefinida para abrir a porta.

Durante alguns testes de rotina foi descoberto um bug uma funcionalidade na hora de validar a senha: O cofre ignora letras erradas durante a digitação da senha, desde que todas as letras da senha tenham sido digitadas na ordem correta.

Por exemplo, se a senha for “cubos” e for digitado “cuggbyos”, o cofre irá abrir.

Input Format

A entrada consistirá em duas linhas, na primeira linha estará a senha correta, de até S caracteres.Na segunda linha estará a palavra digitada pela pessoa, de até N caracteres.

    Constraints

S ≤ 10 ^ 3 N ≤ 10 ^ 5

Output Format

Imprima “SIM” caso o cofre abra.Caso contrário, imprimir “NAO”. */

function processData(input) {
    let array = input.split("\n")
    let senha = array.slice(0, 1).join()
    let digitado = array.slice(1).join()

    let novoDigitado = []
    let i = 0
    let j = 0
    while (i < digitado.length) {
        if (digitado[i] === senha[j]) {
            novoDigitado.push(digitado[i])
            j++
        }
        i++
    }
    digitado = novoDigitado.join("")
    console.log(senha === digitado ? "SIM" : "NAO")
}

processData("cubos\ncuhgkbgkosdfh")






