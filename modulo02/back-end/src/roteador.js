const express = require("express");
const { listarContas, criarConta, atualizarUsuarioConta, excluirConta, saldo, extrato } = require("./controladores/contas");
const { depositar, sacar, transferir } = require("./controladores/transacoes");

const roteador = express();

roteador.get("/contas", listarContas);
roteador.post("/contas", criarConta);
roteador.put("/contas/:numeroConta/usuario", atualizarUsuarioConta);
roteador.delete("/contas/:numeroConta", excluirConta);

roteador.post("/transacoes/depositar", depositar);
roteador.post("/transacoes/sacar", sacar);
roteador.post("/transacoes/transferir", transferir);

roteador.get("/contas/saldo", saldo);
roteador.get("/contas/extrato", extrato);

module.exports = roteador;