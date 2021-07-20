function solucao(lista) {
    // seu código aqui
    let menorIdade = Infinity;

    for (let idade of lista) {
        if (idade >= 18 && idade < menorIdade) {
            menorIdade = idade;
        }
    }
    if (menorIdade != Infinity) {
        console.log(menorIdade);
    } else {
        console.log("CRESÇA E APAREÇA");
    };
}