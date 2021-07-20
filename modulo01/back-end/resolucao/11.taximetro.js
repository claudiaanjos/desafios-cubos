function solucao(min, km) {
    let custoMin = 0;
    let custoKm = 0;
    if (min > 20) {
        custoMin = 20 * 50 + (min - 20) * 30;
    } else {
        custoMin = min * 50;
    }

    if (km > 10) {
        custoKm = 10 * 70 + (km - 10) * 50
    } else {
        custoKm = km * 70;
    }

    console.log(custoKm + custoMin);
}