function solucao(min, max, valores) {
    //seu código aqui
    let valoresPermitidos = [];

    for (let valor of valores) {
        if (valor >= min && valor <= max) {
            valoresPermitidos.push(valor);
        }
    }

    console.log(valoresPermitidos);
}