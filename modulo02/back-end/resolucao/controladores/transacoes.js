const bancodedados = require('../bancodedados');
const { format } = require('date-fns');

async function depositar(req, res) {
    const { numero_conta, valor } = req.body;
    const { contas, depositos } = bancodedados;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'Só é permitido valores maior que zero!' });
    }

    const contaEncontrada = contas.find(conta => {
        return conta.numero === numero_conta;
    });

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta inexistente!' });
    }

    contaEncontrada.saldo += valor;

    depositos.push({
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta: numero_conta,
        valor: valor
    });

    return res.json({ mensagem: 'Deposito realizado com sucesso!' });
}

async function sacar(req, res) {
    const { numero_conta, valor, senha } = req.body;
    const { contas, saques } = bancodedados;

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, a senha e o valor são obrigatórios!' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'Só é permitido valores maior que zero!' });
    }

    const contaEncontrada = contas.find(conta => {
        return conta.numero === numero_conta;
    });

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta inexistente!' });
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'senha inválida' });
    }

    if (contaEncontrada.saldo < valor) {
        return res.status(400).json({ mensagem: 'saldo insuficiente' });
    }

    contaEncontrada.saldo -= valor;

    saques.push({
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta: numero_conta,
        valor: valor
    });

    return res.json({ mensagem: 'saque realizado com sucesso!' });
}

async function transferir(req, res) {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    const { contas, transferencias } = bancodedados;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta de origem, de destino, a senha e o valor são obrigatórios!' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'Só é permitido valores maior que zero!' });
    }

    const contaEncontradaOrigem = contas.find(conta => {
        return conta.numero === numero_conta_origem;
    });

    if (!contaEncontradaOrigem) {
        return res.status(404).json({ mensagem: 'Conta de origem inexistente!' });
    }

    const contaEncontradaDestino = contas.find(conta => {
        return conta.numero === numero_conta_destino;
    });

    if (!contaEncontradaDestino) {
        return res.status(404).json({ mensagem: 'Conta de destino inexistente!' });
    }

    if (contaEncontradaOrigem.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'senha inválida' });
    }

    if (contaEncontradaOrigem.saldo < valor) {
        return res.status(400).json({ mensagem: 'saldo insuficiente' });
    }

    contaEncontradaOrigem.saldo -= valor;
    contaEncontradaDestino.saldo += valor;

    transferencias.push({
        data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        numero_conta_origem,
        numero_conta_destino,
        valor: valor
    });

    return res.json({ mensagem: 'transferencia realizada com sucesso!' });
}

async function saldo(req, res) {
    const { numero_conta, senha } = req.query
    const { contas } = bancodedados;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'o numero da conta e a senha são obrigatórios!' });
    }

    const contaEncontrada = contas.find(conta => {
        return conta.numero === numero_conta;
    });

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta inexistente!' });
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'senha inválida' });
    }

    return res.json({ saldo: contaEncontrada.saldo });
}

async function extrato(req, res) {
    const { numero_conta, senha } = req.query
    const { contas } = bancodedados;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'o numero da conta e a senha são obrigatórios!' });
    }

    const contaEncontrada = contas.find(conta => {
        return conta.numero === numero_conta;
    });

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta inexistente!' });
    }

    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'senha inválida' });
    }

    const depositos = bancodedados.depositos.filter(deposito => {
        return deposito.numero_conta === numero_conta;
    });

    const saques = bancodedados.saques.filter(saque => {
        return saque.numero_conta === numero_conta;
    });

    const transferenciasEnviadas = bancodedados.transferencias.filter(transferencia => {
        return transferencia.numero_conta_origem === numero_conta;
    });

    const transferenciasRecebidas = bancodedados.transferencias.filter(transferencia => {
        return transferencia.numero_conta_destino === numero_conta;
    });

    return res.json({ depositos, saques, transferenciasEnviadas, transferenciasRecebidas });
}

module.exports = {
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}