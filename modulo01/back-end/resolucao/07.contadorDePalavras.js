function solucao(texto) {
    // Seu código aqui
    const palavras = texto.trim().split(" ");

    //existem casos de teste em que tem vários espaços seguidos
    // por ex: "Eu    sou    legal"
    // por isso ao dar split por espaços ficam varios elementos nulos,
    // que precisam ser removidos

    palavras = palavras.filter(x => x); //remover elementos nulos

    console.log(palavras.length);
}

function processData(input) {
    solucao(input)
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});