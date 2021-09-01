const { format } = require('date-fns');
const dados = require('../bancodedados');



function listarContas (req, res) {
    if (!req.query.senha_banco) {
        res.status(400).json({ mensagem: "Informar a senha do banco." });
    } else {
        if (req.query.senha_banco !== dados.banco.senha) {
            res.status(400).json({ mensagem: "Senha incorreta." });
        }
        else {
            res.status(200).json(dados.contas);
        }
    }
}



let numero = 1;

function criarConta (req, res) {
    let novaConta = req.body;
    let contaCriada;

    const erro = validarConta(novaConta);
    if (erro) { return res.status(400).json({ mensagem: erro }); }

    contaCriada = {
        numero: numero,
        saldo: 0,
        usuario: {
            nome: novaConta.nome,
            cpf: novaConta.cpf,
            data_nascimento: novaConta.data_nascimento,
            telefone: novaConta.telefone,
            email: novaConta.email,
            senha: novaConta.senha
        }
    }

    numero++;
    dados.contas.push(contaCriada);
    res.status(201).json(contaCriada);
}



function atualizarUsuarioConta (req, res) {
    const conta = dados.contas.find((conta) => conta.numero === Number(req.params.numeroConta));

    let alterado = req.body;

    if (isNaN(req.params.numeroConta)) { return res.status(400).json({ mensagem: "Informar um número de conta." }); }
    if (!conta) {return res.status(404).json({ mensagem: "Conta não encontrada." });}

    if (objetoVazio(alterado)) {return res.status(400).json({ mensagem: "Pelo menos um campo deve ser informado para alteração." });}

    const cpfDuplicado = dados.contas.find((cpf) => cpf.usuario.cpf === alterado.cpf);
    const emailDuplicado = dados.contas.find((email) => email.usuario.email === alterado.email);

    if (cpfDuplicado) { return res.status(400).json({ mensagem: "O cpf já está vinculado a uma conta." }); }
    if (emailDuplicado) { return res.status(400).json({ mensagem: "O email já está vinculado a uma conta." }); }
    

    alterado.nome !== undefined ? conta.usuario.nome = alterado.nome : conta.usuario.nome = conta.usuario.nome;
    alterado.cpf !== undefined ? conta.usuario.cpf = alterado.cpf : conta.usuario.cpf = conta.usuario.cpf;
    alterado.data_nascimento !== undefined ? conta.usuario.data_nascimento = alterado.data_nascimento : conta.usuario.data_nascimento = conta.usuario.data_nascimento;
    alterado.telefone !== undefined ? conta.usuario.telefone = alterado.telefone : conta.usuario.telefone = conta.usuario.telefone;
    alterado.email !== undefined ? conta.usuario.email = alterado.email : conta.usuario.email = conta.usuario.email;
    alterado.senha !== undefined ? conta.usuario.senha = alterado.senha : conta.usuario.senha = conta.usuario.senha;

    res.status(200).json({ mensagem: "Conta atualizada com sucesso!" });
}



function excluirConta (req, res) {
    const numeroSolicitado = Number(req.params.numeroConta);

    if (isNaN(numeroSolicitado)) { return res.status(400).json({ mensagem: "Informar um número de conta." }); }

    const contaExcluir = dados.contas.find((conta) => conta.numero === numeroSolicitado);
    const indice = dados.contas.indexOf(contaExcluir);
    let contaDeletada;

    if (indice < 0) {
        res.status(404).json({ mensagem: "Número da conta a ser excluída não encontrado."});
    } else {
        if (contaExcluir.saldo === 0) {
            contaDeletada = dados.contas.splice(indice, 1);
            res.status(200).json({ mensagem: "Conta excluída com sucesso!" });
        } else {
            res.status(400).json({ mensagem: "A conta não pode ser excluída, pois ainda tem saldo." });
        }
    }
}



function saldo(req, res) {
    let dado = req.query;
    const contaSaldo = dados.contas.find((conta) => conta.numero === Number(dado.numero_conta));

    const erro = validarSaldoExtrato(dado, contaSaldo);
    if (erro) { return res.status(400).json({ mensagem: erro }); }

    res.status(200).json({ saldo: contaSaldo.saldo });
}


function extrato(req, res) {
    let dado = req.query;
    let extrato;
    const contaExtrato = dados.contas.find((conta) => conta.numero === Number(dado.numero_conta));

    const erro = validarSaldoExtrato(dado, contaExtrato);
    if (erro) { return res.status(400).json({ mensagem: erro }); }

    const depositoUsuario = dados.depositos.filter((deposito) => deposito.numero_conta === Number(dado.numero_conta));
    const saqueUsuario = dados.saques.filter((saque) => saque.numero_conta === Number(dado.numero_conta));
    const transfEnvUsuario = dados.transferencias.filter((transfR) => transfR.numero_conta_origem === Number(dado.numero_conta));
    const transfRecUsuario = dados.transferencias.filter((transfE) => transfE.numero_conta_destino === Number(dado.numero_conta));

    extrato = {
        depositos: depositoUsuario,
        saques: saqueUsuario,
        transferenciasEnviadas: transfEnvUsuario,
        transferenciasRecebidas: transfRecUsuario
    }

    res.status(200).json(extrato);
}



function validarConta(conta) {
    if (!conta.nome) { return "O campo nome é obrigatório."; }
    if (!conta.cpf) { return "O campo cpf é obrigatório."; }
    if (!conta.data_nascimento) { return "O campo data de nascimento é obrigatório."; }
    if (!conta.telefone) { return "O campo telefone é obrigatório."; }
    if (!conta.email) { return "O campo email é obrigatório."; }
    if (!conta.senha) { return "O campo senha é obrigatório."; }
    if (dados.contas.find((cpf) => cpf.usuario.cpf === conta.cpf)) { return "Esse cpf já está vinculado a uma conta."; }
    if (dados.contas.find((email) => email.usuario.email === conta.email)) { return "Esse email já está vinculado a uma conta."; }
}

function objetoVazio(objeto) {
    for (let propriedade in objeto) {
        if (objeto.hasOwnProperty(propriedade))
            return false;
    }
    return true;
}

function validarSaldoExtrato(dado, conta) {
    if (!dado.numero_conta) { return "Informar o número da conta."; }
    if (!dado.senha) { return "Informar a senha."; }
    if (!conta) { return "Conta não encontrada."; }
    if (conta.usuario.senha !== dado.senha) { return "Senha inválida."; }
}



module.exports = {
    listarContas,
    criarConta,
    atualizarUsuarioConta,
    excluirConta,
    saldo,
    extrato
}