const bancodedados = require('../bancodedados');

async function criarConta(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { contas } = bancodedados;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    }

    const contaExiste = contas.find(conta => {
        return conta.usuario.cpf === cpf || conta.usuario.email === email;
    });

    if (contaExiste) {
        return res.status(400).json({ mensagem: 'Já possui uma conta com o cpf ou e-mail informado!' });
    }

    const novaConta = {
        numero: (contas.length + 1).toString(),
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    contas.push(novaConta);

    return res.status(201).json(novaConta);
}

async function listarContas(req, res) {
    const { senha_banco } = req.query;
    const { contas, banco } = bancodedados;

    if (!senha_banco) {
        return res.status(400).json({ mensagem: 'A senha do banco é obrigatória!' });
    }

    if (senha_banco !== banco.senha) {
        return res.status(400).json({ mensagem: 'A senha do banco é inválida!' });
    }

    return res.json(contas);
}

async function atualizarUsuarioConta(req, res) {
    const { numeroConta } = req.params;
    const { contas } = bancodedados;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return res.status(400).json({ mensagem: 'é necessário informar ao menos um campo para atualizar!' });
    }

    const contaEncontrada = contas.find(conta => {
        return conta.numero === numeroConta;
    });

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta inexistente!' });
    }

    if (cpf && cpf !== contaEncontrada.usuario.cpf) {
        const existeCpf = contas.find(conta => {
            return conta.usuario.cpf === cpf
        });

        if (existeCpf) {
            return res.status(400).json({ mensagem: 'já existe um cpf igual ao informado!' });
        }
    }

    if (email && email !== contaEncontrada.usuario.email) {
        const existeEmail = contas.find(conta => {
            return conta.usuario.email === email
        });

        if (existeEmail) {
            return res.status(400).json({ mensagem: 'já existe um email igual ao informado!' });
        }
    }

    const novoUsuario = {
        nome: nome || contaEncontrada.usuario.nome,
        cpf: cpf || contaEncontrada.usuario.cpf,
        email: email || contaEncontrada.usuario.email,
        data_nascimento: data_nascimento || contaEncontrada.usuario.data_nascimento,
        telefone: telefone || contaEncontrada.usuario.telefone,
        senha: senha || contaEncontrada.usuario.senha
    }

    contaEncontrada.usuario = novoUsuario;

    return res.json({ mensagem: 'Usuario atualizado com sucesso' });
}

async function excluirConta(req, res) {
    const { numeroConta } = req.params;
    const { contas } = bancodedados;

    const contaEncontrada = contas.find(conta => {
        return conta.numero === numeroConta;
    });

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta inexistente!' });
    }

    if (contaEncontrada.saldo > 0) {
        return res.status(400).json({ mensagem: 'não é possível excluir uma conta com saldo maior que zero!' });
    }

    bancodedados.contas = contas.filter(conta => {
        return conta.numero !== numeroConta
    });

    return res.json({ mensagem: 'Conta excluida com sucesso' });
}

module.exports = {
    criarConta,
    listarContas,
    atualizarUsuarioConta,
    excluirConta
}