function processData(input) {
    //Enter your code here
    const linha = input.trim().split("\n");
    const correta = linha[0];
    let digitada = linha[1];

    for (let c of correta) {
        let index = digitada.indexOf(c);
        if (index === -1) {
            console.log("NAO");
            return;
        } else {
            digitada = digitada.substr(index + 1);
        }
    }
    console.log("SIM");
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
