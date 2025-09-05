// Importar pacotes/bibliotecas
import express from "express";
import dotenv, { parse } from "dotenv";

// Importar Lista de Array
import dados from "./src/data/dados.js";
const { bruxos,varinhas,pocoes,animais } = dados;

// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

app.get("/varinhas", (req, res) => {
    const { material, nucleo, comprimento } = req.query;
    let resultado = varinhas;

    if (material) {
        resultado = resultado.filter((v) => v.material.toLowerCase().includes(material.toLowerCase()));
    }

    if (nucleo) {
    resultado = resultado.filter((v) => v.nucleo.toLowerCase().includes(nucleo.toLowerCase()));
    }

    if (comprimento) {
        resultado = resultado.filter((v) => v.comprimento == comprimento);
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});

app.post("/varinhas", (req, res) => {
  const { material, nucleo, comprimento } = req.body;

  if (material === false || !nucleo || !comprimento) {
    return res.status(400).json({
      sucess: false,
      message: "Material, nucleo e comprimento são obrigadas para a varinha!",
    });
  }
  const novaVarinha ={
    id: varinhas.length + 1,
    material,
    nucleo,
    comprimento,
  }

  varinhas.push(novaVarinha);

  res.status(201).json({
    sucess: true,
    message: "Nova varinha adicionada!",
    data: novaVarinha,
  });
})

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

app.get("/pocoes", (req, res) => {
    const { nome, efeito } = req.query;
    let resultado = pocoes;

    if (nome) {
        resultado = resultado.filter((p) => p.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    if (efeito) {
    resultado = resultado.filter((p) => p.efeito.toLowerCase().includes(efeito.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});

app.post("/pocoes", (req, res) => {
  const { nome, efeito } = req.body;

  if (nome === false || !efeito ) {
    return res.status(400).json({
      sucess: false,
      message: "Nome, e efeitos são obrigadas para a poção!",
    });
  }
  const novaPocoes ={
    id: pocoes.length + 1,
    nome,
    efeito,
  }

  pocoes.push(novaPocoes);

  res.status(201).json({
    sucess: true,
    message: "Nova poção adicionado ao inventário!",
    data: novaPocoes,
  });
})

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

app.get("/animais", (req, res) => {
    const { nome, tipo } = req.query;
    let resultado = animais;

    if (nome) {
        resultado = resultado.filter((a) => a.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    if (tipo) {
    resultado = resultado.filter((a) => a.tipo.toLowerCase().includes(tipo.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});

app.post("/animais", (req, res) => {
  const { nome, tipo } = req.body;

  if (nome === false || !tipo ) {
    return res.status(400).json({
      sucess: false,
      message: "Nome, e tipo são obrigadas para o animal!",
    });
  }
  const novoAnimais ={
    id: animais.length + 1,
    nome,
    tipo,
  }

  animais.push(novoAnimais);

  res.status(201).json({
    sucess: true,
    message: "Novo animal adicionado a equipe!",
    data: novoAnimais,
  });
})

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

app.get("/bruxos", (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;

    if (casa) {
        resultado = resultado.filter((b) => b.casa.toLowerCase().includes(casa.toLowerCase()));
    }

    if (ano) {
        resultado = resultado.filter((b) => b.ano == ano);
    }

    if (especialidade) {
        resultado = resultado.filter((b) => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }

    if (nome) {
        resultado = resultado.filter((b) => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado,
    });
});


// Rota para criar Bruxo

    // Acessando dados do body    
    // Validação de campos obrigatórios  
    // Criar novo bruxo
    // Adicionar à lista de bruxos
    // Adiciona response da API

app.post("/bruxos", (req, res) => {
  const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo} = req.body;

  if (nome === false || !casa) {
    return res.status(400).json({
      sucess: false,
      message: "Nome e casa são obrigatórios para um bruxo!",
    });
  }
  const novoBruxo ={
    id: bruxos.length + 1,
    nome,
    casa: casa,
    ano: parseInt(ano),
    varinha: varinha,
    mascote,
    patrono,
    especialidade: especialidade || "Ainda não atribuido!",
    vivo: vivo
  }

  bruxos.push(novoBruxo);

  res.status(201).json({
    sucess: true,
    message: "Novo bruxo adicionado a Hogwarts!",
    data: novoBruxo,
  });
})

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});
