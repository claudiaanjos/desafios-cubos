function processData(input) {
    if (input === input.toUpperCase() || (input[0] === input[0].toLowerCase() && input.substr(1) === input.substr(1).toUpperCase())) {
        let resultado = ''
        for (let letra of input){
            if (letra === letra.toUpperCase()) {
                resultado += letra.toLowerCase();
            } else {
                resultado += letra.toUpperCase();
            }
        }
        console.log(resultado);
    } else {
        console.log(input);
    }
} 