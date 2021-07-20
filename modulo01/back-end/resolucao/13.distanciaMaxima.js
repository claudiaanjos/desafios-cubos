function processData(input) {
    //Enter your code here
    const linhas = input.trim().split("\n");
    const coordenadas = [];
    let maiorDistancia = 0;
    for (let linha of linhas) {
        const par = linha.trim().split(" ");
        coordenadas.push({
            x: parseFloat(par[0], 10),
            y: parseFloat(par[1], 10)
        });
    }
    for (let c1 of coordenadas) {
        for (let c2 of coordenadas) {
            const distancia = Math.sqrt((c2.x - c1.x) ** 2 + (c2.y - c1.y) ** 2);
            if (distancia > maiorDistancia) {
                maiorDistancia = distancia;
            }
        }
    }
    console.log(maiorDistancia);
}