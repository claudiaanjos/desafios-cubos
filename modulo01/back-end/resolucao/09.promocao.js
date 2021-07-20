function solucao(precos) {
    //seu código aqui
    let valorCarrinho = 0;
    let itemMaisBarato = Infinity;
    let valorAPagar = 0;

    for (let valor of precos) {
        valorCarrinho += valor;
        if (valor < itemMaisBarato) {
            itemMaisBarato = valor;
        };
    };

    if (precos.length > 2) {
        valorAPagar = valorCarrinho - (itemMaisBarato * 0.5);
    }
    else {
        valorAPagar = valorCarrinho;
    }

    console.log(valorAPagar);
}