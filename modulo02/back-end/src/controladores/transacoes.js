const { format } = require('date-fns');
const dados = require('../bancodedados');



function depositar(req, res) {
    let depositado = req.body;
    let saida;
    const contaDeposito = dados.contas.find((conta) => conta.numero === Number(depositado.numero));

    const erro = validarTransacoes(depositado);
    if (erro) { return res.status(400).json({ mensagem: erro }); }

    if (!contaDeposito) { return res.status(404).json({ mensagem: "Conta não encontrada." }); }

    if (contaDeposito) {
        if (Number(depositado.valor) <= 0) {
            return res.status(400).json({ mensagem: "O depósito de valores negativos ou zerados não é permitido." });
        } else {
            contaDeposito.saldo += Number(depositado.valor);
            const date = new Date();

            saida = {
                data: format(date, "yyyy-MM-dd HH:mm:ss"),
                numero_conta: contaDeposito.numero,
                valor: Number(depositado.valor)
            }

            dados.depositos.push(saida);

            res.status(200).json({ mensagem: "Depósito realizado com sucesso!" });
        }
    }
}




function sacar(req, res) {
    let sacado = req.body;
    let saida;
    const contaSacar = dados.contas.find((conta) => conta.numero === Number(sacado.numero));

    const erro = validarTransacoes(sacado);
    if (erro) { return res.status(400).json({ mensagem: erro }); }

    if (!contaSacar) { return res.status(404).json({ mensagem: "Conta não encontrada." }); }

    if (contaSacar.usuario.senha !== sacado.senha) { return res.status(404).json({ mensagem: "Senha inválida." }); }

    if (contaSacar && contaSacar.saldo >= Number(sacado.valor)) {
        if (Number(sacado.valor) <= 0) {
            return res.status(400).json({ mensagem: "O saque de valores negativos ou zerados não é permitido." });
        } else {
            contaSacar.saldo -= Number(sacado.valor);
            const date = new Date();

            saida = {
                data: format(date, "yyyy-MM-dd HH:mm:ss"),
                numero_conta: contaSacar.numero,
                valor: Number(sacado.valor)
            }

            dados.saques.push(saida);

            res.status(200).json({ mensagem: "Saque realizado com sucesso!" });
        }
    }
    else { res.status(400).json({ mensagem: "Saldo insuficiente para realizar o saque." }); }
}



function transferir(req, res) {
    let transferencia = req.body;
    let saida;
    
    const contaOrigem = transferencia.numero_conta_origem;
    const contaDestino = transferencia.numero_conta_destino;

    const origem = dados.contas.find((conta) => conta.numero === Number(contaOrigem));
    const destino = dados.contas.find((conta) => conta.numero === Number(contaDestino));

    if (contaOrigem === contaDestino) { return res.status(400).json({ mensagem: "A conta de origem não pode ser a mesma de destino" }); }

    if (!transferencia) { return res.status(404).json({ mensagem: "Informar os dados para transação." }); }
    if (!contaOrigem) { return res.status(404).json({ mensagem: "Número de conta de origem não encontrado." }); }
    if (!contaDestino) { return res.status(404).json({ mensagem: "Número de conta de destino não encontrado." }); }
    
    if (!origem) { return res.status(404).json({ mensagem: "Conta de origem não encontrada." }); }
    if (!destino) { return res.status(404).json({ mensagem: "Conta de destino não encontrada." }); }

    if (transferencia.senha !== origem.usuario.senha) { return res.status(400).json({ mensagem: "Senha inválida." }); }
    if (!transferencia.valor) { return res.status(400).json({ mensagem: "Informar um valor para realizar a transação." }); }

    if (transferencia && origem.saldo >= transferencia.valor) {

        if (Number(transferencia.valor) <= 0) {
            return res.status(400).json({ mensagem: "A transferência de valores negativos ou zerados não é permitida." });
        } else {
            origem.saldo -= Number(transferencia.valor);
            destino.saldo += Number(transferencia.valor);
            const date = new Date();

            saida = {
                data: format(date, "yyyy-MM-dd HH:mm:ss"),
                numero_conta_origem: origem.numero,
                numero_conta_destino: destino.numero,
                valor: Number(transferencia.valor)
            }

            dados.transferencias.push(saida);

            res.status(200).json({ mensagem: "Transferência realizada com sucesso!" });
        }
        
    } else { res.status(400).json({ mensagem: "Saldo insuficiente para realizar a transferência." }); }
}


function validarTransacoes(transacao) {
    if (!transacao) { return "Informar os dados para transação."; }
    if (!transacao.numero) { return "Número de conta não encontrado." }
    if (!transacao.valor) { return "Informar um valor para realizar a transação."; }
}




module.exports = {
    depositar,
    sacar,
    transferir
}