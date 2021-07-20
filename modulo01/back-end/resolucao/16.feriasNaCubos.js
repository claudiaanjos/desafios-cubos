function processData(input) {
    //Enter your code here
    const entradas = input.trim().split(" ");
    let um = parseInt(entradas[0], 10);
    let dois = parseInt(entradas[1], 10);
    let tres = parseInt(entradas[2], 10);
    let quatro = parseInt(entradas[3], 10);

    let taxis = quatro;
    quatro = 0;

    taxis += Math.floor(dois / 2);
    dois = dois % 2;

    const umComTres = Math.min(um, tres);
    taxis += umComTres;
    um -= umComTres;
    tres -= umComTres;

    if (tres === 0) {
        taxis += Math.ceil((um + dois * 2) / 4);
    } else {
        taxis += (tres + dois);
    }
    console.log(taxis);
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
