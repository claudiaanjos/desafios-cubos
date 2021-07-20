function solucao(lista) {
    //seu codigo aqui
    let valorAcumulado = 0;

    for (let valor of lista) {
        valorAcumulado += valor;
    };

    const mediaDiaria = valorAcumulado / lista.length;
    console.log(mediaDiaria);
}