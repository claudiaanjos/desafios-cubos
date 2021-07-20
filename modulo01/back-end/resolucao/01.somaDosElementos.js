function solucao(lista) {
    //seu codigo aqui
    let valorAcumulado = 0;

    for (let valor of lista) {
        valorAcumulado += valor;
    };

    console.log(valorAcumulado);
}