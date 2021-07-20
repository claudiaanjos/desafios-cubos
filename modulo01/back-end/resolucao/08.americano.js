function solucao(numeros) {
    const soma = numeros.reduce((acc, x) => acc + x);
    const resto = soma % numeros.length;

    if (resto === 0) {
        console.log(numeros.length)
    } else {
        console.log(resto);
    }
}

